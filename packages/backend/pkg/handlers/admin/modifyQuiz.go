package admin

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var questions models.Questions

type deletePayload struct {
	ObjectId   string `json:"obId"`
	QuestionId int    `json:"questionId"`
}
type questionPayload struct {
	ObId        string              `json:"obId"`
	Id          int                 `json:"questionId"`
	Question    string              `json:"question"`
	Choice      []string            `json:"choice"`
	Answer      int                 `json:"answer"`
	Explanation string              `json:"explanation"`
	Keywords    []map[string]string `json:"keywords"`
}
type importedQuiz struct {
	Topic_id    string              `json:"topic_id" bson:"topic_id"`
	Question    string              `json:"question"`
	Choice      []string            `json:"choice"`
	Answer      int                 `json:"answer"`
	Explanation string              `json:"explanation"`
	Keywords    []map[string]string `json:"keywords"`
}

func AddQuiz(c *gin.Context) {

	var importedQ importedQuiz
	var question models.Questions
	c.BindJSON(&importedQ)
	filter := bson.M{"topic_id": importedQ.Topic_id}

	collection := models.DB.Database("mella").Collection("quizes")
	ctx, _ := context.WithTimeout(context.Background(), time.Second*20)
	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
	}
	if count == 0 { //if there is no quize with specified topic id

		//#Todo
		//insert the quiz to database
		err = collection.FindOne(ctx, filter).Decode(&question)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
		indexes := len(question.Questions)

		var q = models.Question{Id: indexes + 1,
			Question:    importedQ.Question,
			Choice:      importedQ.Choice,
			Answer:      importedQ.Answer,
			Explanation: importedQ.Explanation,
			Keywords:    importedQ.Keywords}

		question.Topic_id = importedQ.Topic_id
		question.Questions = []models.Question{q}
		collection.InsertOne(ctx, question)
	} else { //if there is quiz with the specified topic id
		//#Todo
		//append to the array of question
		err = collection.FindOne(ctx, filter).Decode(&question)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
		indexes := len(question.Questions)

		update := bson.M{"$push": bson.M{"questions": bson.M{
			"id":          indexes + 1,
			"question":    importedQ.Question,
			"choice":      importedQ.Choice,
			"answer":      importedQ.Answer,
			"explanation": importedQ.Explanation,
			"keywords":    importedQ.Keywords}}}

		collection.UpdateOne(ctx, filter, update)
	}
	//return object
	var quiz models.Questions
	err = collection.FindOne(ctx, filter).Decode(&quiz)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	c.JSON(http.StatusOK, quiz.Questions)
}

func DeleteQuiz(c *gin.Context) {
	var deletePayload deletePayload
	c.BindJSON(&deletePayload)
	fmt.Println("delete payload ", deletePayload)
	id, err := primitive.ObjectIDFromHex(deletePayload.ObjectId)
	if err != nil {
		log.Println(err.Error())
	}
	filter := bson.M{"_id": id}
	questionIndex := "questions." + strconv.Itoa(deletePayload.QuestionId-1)
	unset := bson.M{"$unset": bson.M{questionIndex: 1}}
	pull := bson.M{"$pull": bson.M{"questions": nil}}

	collection := models.DB.Database("mella").Collection("quizes")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	_, err = collection.UpdateOne(ctx, filter, unset) // make nil the value
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "error while unseting"})
		return
	}
	_, err = collection.UpdateOne(ctx, filter, pull) //pull all the nil values from array
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "error while pulling"})
		return
	}
	//then if the removed item is from the middle of the array we need to re arrange the question number
	questionid := deletePayload.QuestionId //the Id to be deleted
	previous := questionid - 1             //the index of deleted Item
	i := previous
	err = collection.FindOne(ctx, filter).Decode(&questions)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Not found"})
		return
	}
	fmt.Println("length of array ", len(questions.Questions))
	if deletePayload.QuestionId < len(questions.Questions)+1 {
		fmt.Println("the item is in the middle of the array")
		for i < len(questions.Questions)-1 { //correct the for loop
			questions.Questions[questionid].Id = questions.Questions[previous].Id
			i++
		}
		questions.Questions[previous].Id = questionid
	}
	// fmt.Println("question object ", questions)
	_, err = collection.ReplaceOne(ctx, filter, questions)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
	}
	//return object
	var quiz models.Questions
	collection.FindOne(ctx, filter).Decode(&quiz)
	c.JSON(http.StatusOK, quiz.Questions)
}

func ModifyQuiz(c *gin.Context) {

	var question questionPayload
	c.BindJSON(&question)
	quiz_id, err := primitive.ObjectIDFromHex(question.ObId)
	if err != nil {
		log.Println(err.Error())
		return
	}
	filter := bson.M{"_id": quiz_id}
	questionIndex := "questions." + strconv.Itoa(question.Id-1)

	change := bson.M{"$set": bson.M{questionIndex: bson.M{
		"id":          question.Id,
		"question":    question.Question,
		"choice":      question.Choice,
		"answer":      question.Answer,
		"explanation": question.Explanation,
		"keywords":    question.Keywords}}}

	collection := models.DB.Database("mella").Collection("quizes")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	_, err = collection.UpdateOne(ctx, filter, change)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	//return object
	var quiz models.Questions
	collection.FindOne(ctx, filter).Decode(&quiz)
	c.JSON(http.StatusOK, quiz.Questions)
}
