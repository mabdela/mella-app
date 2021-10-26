package contents

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CommentFromFront struct {
	Content  string `json:"content" `
	Topic_id string `json:"topic_id" `
	UserId   string `json:"user_id" `
}
type CommentInfo struct { //to take information about the comment to be modified (increase or decrese the likes)
	UserId    string `json:"userId"`
	CommentId string `json:"commentId"`
}
type commentUpdatePayload struct {
	CommentId  string `json:"commentId"`
	UpdateText string `json:"updateText"`
}

func AddComments(c *gin.Context) {

	var commetfromfront CommentFromFront

	c.BindJSON(&commetfromfront)
	// fmt.Println(commetfromfront)

	var comments models.CommentsAdd

	comments.Content = commetfromfront.Content
	comments.UserId = commetfromfront.UserId
	comments.Topic_id = commetfromfront.Topic_id
	comments.Likes = []string{}
	comments.Date = time.Now()

	fmt.Println("comments :", comments)
	db := models.DB

	collection := db.Database("mella").Collection("comment")
	var ctx, _ = context.WithTimeout(context.Background(), 20*time.Second)
	result, err := collection.InsertOne(ctx, comments)

	// fmt.Println(result.InsertedID)
	if err != nil {
		fmt.Println("data base insertion error ", err.Error())
	}

	var loadresponse models.CommentsLoad
	collection.FindOne(ctx, bson.M{"_id": result.InsertedID}).Decode(&loadresponse)
	var user models.User
	user_id, err := primitive.ObjectIDFromHex(loadresponse.UserId)
	if err != nil {
		fmt.Println(err.Error())
	}
	// fmt.Println("the user id is :", user_id)
	filter := bson.M{"_id": user_id}
	collection = db.Database("mella").Collection("users")
	collection.FindOne(ctx, filter).Decode(&user)
	fmt.Println(user)
	var response = models.CommentResponse{
		Comment_ID: loadresponse.ID.Hex(),
		First_Name: user.Firstname,
		Last_Name:  user.Lastname,
		User_Id:    loadresponse.UserId,
		Date:       loadresponse.Date,
		Likes:      loadresponse.Likes,
		Content:    loadresponse.Content,
		Topic_id:   loadresponse.Topic_id,
	}

	c.JSON(http.StatusOK, response)

}

//to retrive a comment from database
//######################################################## it may not be necesasary for now
func LoadComments(c *gin.Context) {

	key := c.Param("comment_id")
	docID, err := primitive.ObjectIDFromHex(key)
	if err != nil {
		fmt.Println(err.Error())
	}
	// fmt.Println("the docId(comment_id) in load comment ", docID)
	filter := bson.M{"_id": docID}
	var comments models.CommentsLoad

	db := models.DB
	collection := db.Database("mella").Collection("comment")
	var ctx, _ = context.WithTimeout(context.Background(), 20*time.Second)
	err = collection.FindOne(ctx, filter).Decode(&comments)
	if err != nil {
		fmt.Println("error in comments database :", err.Error())
	}

	//to load a user (who commeted) information
	var user models.User

	user_id, err := primitive.ObjectIDFromHex(comments.UserId)
	if err != nil {
		fmt.Println(err.Error())
	}

	filter = bson.M{"_id": user_id}
	collection = db.Database("mella").Collection("users")
	err = collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {
		fmt.Println("error in users database :", err.Error())
	}

	var comment_res = models.CommentResponse{
		First_Name: user.Firstname,
		Last_Name:  user.Lastname,
		Date:       comments.Date,
		Likes:      comments.Likes,
		Content:    comments.Content,
		Topic_id:   comments.Topic_id}

	c.JSON(http.StatusOK, comment_res)
}

//##############################################################

//load with topic id
func LoadCommentsWithTopic(c *gin.Context) {

	key := c.Param("topic_id")
	filter := bson.M{"topic_id": key}
	var comments models.CommentsLoad
	var commentsArray []models.CommentResponse
	db := models.DB
	collection := db.Database("mella").Collection("comment")
	var ctx, _ = context.WithTimeout(context.Background(), 20*time.Second)
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Println(err.Error())
	}
	defer cursor.Close(ctx)

	var user models.User

	for cursor.Next(ctx) {

		err := cursor.Decode(&comments)
		if err != nil {
			fmt.Println("error when decoding on comments :", err.Error())
		}
		user_id, err := primitive.ObjectIDFromHex(comments.UserId)

		if err != nil {
			fmt.Println(err.Error())
		}

		filter = bson.M{"_id": user_id}
		collection = db.Database("mella").Collection("users")
		err = collection.FindOne(ctx, filter).Decode(&user)

		if err != nil {
			fmt.Println(err.Error())
		}

		var comment_res = models.CommentResponse{
			Comment_ID: comments.ID.Hex(),
			First_Name: user.Firstname,
			Last_Name:  user.Lastname,
			User_Id:    user.ID.Hex(),
			Date:       comments.Date,
			Likes:      comments.Likes,
			Content:    comments.Content,
			Topic_id:   comments.Topic_id}

		commentsArray = append(commentsArray, comment_res)
	}
	cursor.Close(ctx)

	c.JSON(http.StatusOK, commentsArray)
}

//to update the like
func UpdateLike(c *gin.Context) {

	var comment_info CommentInfo
	c.BindJSON(&comment_info)
	comment_id := comment_info.CommentId
	doc_comment_ID, err := primitive.ObjectIDFromHex(comment_id)
	if err != nil {
		fmt.Println(err.Error())
	}
	find := bson.M{"_id": doc_comment_ID, "likes": comment_info.UserId}

	var db = models.DB
	collection := db.Database("mella").Collection("comment")
	var ctx, _ = context.WithTimeout(context.Background(), 20*time.Second)
	count, err := collection.CountDocuments(ctx, find)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Error updating like count"})
		return
	}

	if count != 0 { //this is when the user is allready in the likes list on that comment

		change := bson.M{"$pull": bson.M{"likes": comment_info.UserId}}
		filter := bson.M{"_id": doc_comment_ID}
		_, err := collection.UpdateOne(ctx, filter, change)
		if err != nil {
			fmt.Println()
		}
		// c.JSON(http.StatusOK, result)
		fmt.Println("the user already liked so disliked")

	} else { //the user didn't have liked it before

		change := bson.M{"$push": bson.M{"likes": comment_info.UserId}}
		filter := bson.M{"_id": doc_comment_ID}
		_, err := collection.UpdateOne(ctx, filter, change)
		if err != nil {
			fmt.Println(err.Error())
		}
		// c.JSON(http.StatusOK, result)
		fmt.Println("the like added")
	}
	//to count the number of likes on spesfic comments
	filter := bson.M{"_id": doc_comment_ID}
	var commentLoad models.CommentsLoad
	collection.FindOne(ctx, filter).Decode(&commentLoad)
	c.JSON(http.StatusOK, commentLoad.Likes)
}

func DeleteComment(c *gin.Context) {
	comment_id := c.Param("comment_id")
	doc_comment_ID, err := primitive.ObjectIDFromHex(comment_id)
	if err != nil {
		fmt.Println(err.Error())
	}
	filter := bson.M{"_id": doc_comment_ID}
	var db = models.DB
	collection := db.Database("mella").Collection("comment")
	var ctx, _ = context.WithTimeout(context.Background(), 20*time.Second)
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "server has counterd error while deleting"})
	}
	c.JSON(http.StatusOK, gin.H{"comment id": comment_id})
}

func UpdateComment(c *gin.Context) {
	var payload commentUpdatePayload
	c.BindJSON(&payload)

	id, _ := primitive.ObjectIDFromHex(payload.CommentId)
	update := bson.M{"$set": bson.M{"content": payload.UpdateText}}
	collection := models.DB.Database("mella").Collection("comment")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	_, err := collection.UpdateByID(ctx, id, update)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	// return
	var comment models.CommentsLoad
	collection.FindOne(ctx, bson.M{"_id": id}).Decode(&comment)
	c.JSON(http.StatusOK, comment)
}
