package admin

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

var user models.UserResponse

func GetAllUsers(c *gin.Context) {
	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	var userResponse []models.UserResponse
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		err := cursor.Decode(&user)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}

		userResponse = append(userResponse, user)
	}
	cursor.Close(ctx)

	c.JSON(http.StatusOK, userResponse)
}

//get user by user email
func GetUserByEmail(c *gin.Context) {
	key := c.Param("email")
	filter := bson.M{"email": key}
	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err := collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

//get by user id
func GetUserById(c *gin.Context) {

	key := c.Param("id")
	user_id, err := primitive.ObjectIDFromHex(key)
	if err != nil {
		fmt.Println(err.Error())
	}
	filter := bson.M{"_id": user_id}
	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err = collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}

//delete user by user email
func DeleteUserByEmail(c *gin.Context) {
	var user models.User
	var userArray []models.User
	key := c.Param("email")

	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	filter := bson.M{"email": key}

	var userInfo models.User
	err := collection.FindOne(ctx, filter).Decode(&userInfo)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	//here we need to delete comments asociated with the user
	filterForComments := bson.M{"userId": userInfo.ID.Hex()}
	commentCollection := models.DB.Database("mella").Collection("comment")
	_, err = commentCollection.DeleteMany(ctx, filterForComments)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err.Error())
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		err := cursor.Decode(&user)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
		userArray = append(userArray, user)
	}
	c.JSON(http.StatusOK, userArray)

}

//delete by user id
func DeleteUserById(c *gin.Context) {
	var user models.User
	var userArray []models.User
	key := c.Param("id")
	docID, err := primitive.ObjectIDFromHex(key)
	if err != nil {
		fmt.Println(err.Error())
	}

	filter := bson.M{"_id": docID}
	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	filterForComments := bson.M{"userId": key}
	commentCollection := models.DB.Database("mella").Collection("comment")
	commentCollection.DeleteMany(ctx, filterForComments)
	//return object
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		err := cursor.Decode(&user)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
		userArray = append(userArray, user)
	}
	c.JSON(http.StatusOK, userArray)
}

func RemoveComment(c *gin.Context) {

	doc_id := c.Param("comment_id")
	id, err := primitive.ObjectIDFromHex(doc_id)
	if err != nil {
		log.Println(err.Error())
	}
	filter := bson.M{"_id": id}

	collection := models.DB.Database("mella").Collection("comment")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	c.JSON(http.StatusOK, doc_id)
}
