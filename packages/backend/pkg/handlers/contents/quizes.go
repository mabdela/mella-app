package contents

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

type quizPayload struct {
	User_id       string `json:"user_id" bson:"user_id"`
	Topic_id      string `json:"topic_id" bson:"topic_id"`
	QuestionIndex int    `json:"question_index" bson:"question_index"`
	ChoiceIndex   int    `json:"choice_index" bson:"choice_index"`
	AnswerIndex   int    `json:"answer_index" bson:"answer_index"`
	ClickedChoice bool   `json:"clicked_choice" bson:"clicked_choice"`
}
type infoPayload struct { //this is to be removed
	UserId  string `json:"user_id"`
	TopicId string `json:"topic_id"`
}

func UpdateQuizInfo(c *gin.Context) {

	var Valid int
	var quizImport quizPayload
	c.BindJSON(&quizImport)

	if quizImport.ChoiceIndex == quizImport.AnswerIndex {
		Valid = 1
	} else {
		Valid = 0
	}

	collection := models.DB.Database("mella").Collection("quizesInfo")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	filter := bson.M{"user_id": quizImport.User_id, "topic_id": quizImport.Topic_id}

	var quizInfo models.QuizInfo

	collection.FindOne(ctx, filter).Decode(&quizInfo)

	filter = bson.M{"user_id": quizImport.User_id, "topic_id": quizImport.Topic_id}
	body := fmt.Sprintf("questions.%d", quizImport.QuestionIndex)
	update := bson.M{"$set": bson.M{body: bson.M{
		"question_index": quizImport.QuestionIndex,
		"choice_index":   quizImport.ChoiceIndex,
		"clicked_choice": true,
		"valid":          Valid}}}

	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "InternalServerError"})
	}

	collection.FindOne(ctx, filter).Decode(&quizInfo)
	c.JSON(http.StatusOK, quizInfo)
}

//to add an unfilled object to the quizesInfo database or just to return if it allready there
func QuizInfo(c *gin.Context) {
	var impoertedInfo infoPayload
	c.BindJSON(&impoertedInfo)

	filter := bson.M{"user_id": impoertedInfo.UserId, "topic_id": impoertedInfo.TopicId}
	collection := models.DB.Database("mella").Collection("quizesInfo")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	count, _ := collection.CountDocuments(ctx, filter)
	var quizInfo models.QuizInfo
	if count > 0 {

		collection.FindOne(ctx, filter).Decode(&quizInfo)

	} else {

		collectionQuiz := models.DB.Database("mella").Collection("quizes")
		var quiz models.Questions
		filterquiz := bson.M{"topic_id": impoertedInfo.TopicId}
		collectionQuiz.FindOne(ctx, filterquiz).Decode(&quiz)

		indexes := len(quiz.Questions)

		index := 0

		quizInfo.User_id = impoertedInfo.UserId
		quizInfo.Topic_id = impoertedInfo.TopicId

		for index < indexes {
			var q = models.QuestionInfo{index, -1, false, -1}
			quizInfo.Questions = append(quizInfo.Questions, q)
			index++
		}

		result, err := collection.InsertOne(context.Background(), quizInfo)
		if err != nil {
			fmt.Println(err.Error())
		}
		fmt.Println(result)
	}
	c.JSON(http.StatusOK, quizInfo)
}
