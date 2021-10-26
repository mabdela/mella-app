package admin

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

// var questions models.Questions

type deletePayload struct {
	Topic_id   string `json:"topic_id"`
	QuestionId int    `json:"questionId"` //index+1
}
type questionPayload struct {
	TopicId     string              `json:"topic_id"`
	Id          int                 `json:"questionId"`
	Question    string              `json:"question"`
	Choice      []string            `json:"choice"`
	Answer      int                 `json:"answer"`
	Explanation string              `json:"explanation"`
	Keywords    []map[string]string `json:"keywords"`
}
type addPayload struct {
	Topic_id    string              `json:"topic_id" `
	Question    string              `json:"question"`
	Choice      []string            `json:"choice"`
	Answer      int                 `json:"answer"`
	Explanation string              `json:"explanation"`
	Keywords    []map[string]string `json:"keywords"`
}

func AddQuiz(c *gin.Context) {

	var addpayload addPayload
	var question models.Questions
	c.BindJSON(&addpayload)
	filter := bson.M{"topic_id": addpayload.Topic_id}

	collection := models.DB.Database("mella").Collection("quizes")
	ctx, _ := context.WithTimeout(context.Background(), time.Second*20)
	count, _ := collection.CountDocuments(ctx, filter)
	if count == 0 { //if there is no quize with specified topic id

		//#Todo
		//insert the quiz to database
		var q = models.Question{
			Id:          1,
			Question:    addpayload.Question,
			Choice:      addpayload.Choice,
			Answer:      addpayload.Answer,
			Explanation: addpayload.Explanation,
			Keywords:    addpayload.Keywords}

		question.Topic_id = addpayload.Topic_id
		question.Questions = []models.Question{q}
		collection.InsertOne(ctx, question)
	} else { //if there is quiz with the specified topic id
		//#Todo
		//append to the array of question
		err := collection.FindOne(ctx, filter).Decode(&question)
		if err != nil {
			if strings.Contains(err.Error(), "no documents") { //if the error is related with document not found
				c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"msg": "server error"})
			}
			return
		}
		indexes := len(question.Questions)

		update := bson.M{"$push": bson.M{"questions": bson.M{
			"id":          question.Questions[indexes-1].Id + 1,
			"question":    addpayload.Question,
			"choice":      addpayload.Choice,
			"answer":      addpayload.Answer,
			"explanation": addpayload.Explanation,
			"keywords":    addpayload.Keywords}}}

		collection.UpdateOne(ctx, filter, update)
	}
	//return object
	c.JSON(http.StatusOK, gin.H{"msg": "quiz added successfully"})
}

func DeleteQuiz(c *gin.Context) {
	var deletePayload deletePayload
	var question models.Questions
	c.BindJSON(&deletePayload)
	fmt.Println("delete payload ", deletePayload)

	filter := bson.M{"topic_id": deletePayload.Topic_id}
	questionIndex := "questions." + strconv.Itoa(deletePayload.QuestionId-1)
	unset := bson.M{"$unset": bson.M{questionIndex: 1}}
	pull := bson.M{"$pull": bson.M{"questions": nil}}

	collection := models.DB.Database("mella").Collection("quizes")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err := collection.FindOne(ctx, filter).Decode(&question)
	if err != nil {
		if strings.Contains(err.Error(), "no documents") { //if the error is related with document not found
			c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "server error"})
		}
		return
	}
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

	c.JSON(http.StatusOK, question.Questions[deletePayload.QuestionId-1]) //changed
}

func ModifyQuiz(c *gin.Context) {

	var questionPay questionPayload
	c.BindJSON(&questionPay)
	fmt.Println("question ", questionPay)
	// quiz_id, err := primitive.ObjectIDFromHex(question.ObId)
	filter := bson.M{"topic_id": questionPay.TopicId}
	questionIndex := "questions." + strconv.Itoa(questionPay.Id-1)

	change := bson.M{"$set": bson.M{questionIndex: bson.M{
		"id":          questionPay.Id,
		"question":    questionPay.Question,
		"choice":      questionPay.Choice,
		"answer":      questionPay.Answer,
		"explanation": questionPay.Explanation,
		"keywords":    questionPay.Keywords}}}

	collection := models.DB.Database("mella").Collection("quizes")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	_, err := collection.UpdateOne(ctx, filter, change)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	//return object
	var quiz models.Questions
	collection.FindOne(ctx, filter).Decode(&quiz)
	c.JSON(http.StatusOK, quiz.Questions[questionPay.Id-1]) //changed
}
