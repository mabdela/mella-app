package admin

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
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
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		err := cursor.Decode(&user)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusNotFound, gin.H{})
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
		c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
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
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}

//delete user by user email
type deleteResponse struct {
	Id        string `json:"id"`
	FirstName string `json:"firstname"`
}

func DeleteUserByEmail(c *gin.Context) {

	key := c.Param("email")

	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	filter := bson.M{"email": key}

	var userInfo models.User
	err := collection.FindOne(ctx, filter).Decode(&userInfo)
	if err != nil {
		log.Println(err.Error())
		if strings.Contains(err.Error(), "no document") { //if the error is related with document not found
			c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "server error"})
		}
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
	commentCollection.DeleteMany(ctx, filterForComments)
	//return object
	deleteRes := deleteResponse{
		Id:        userInfo.ID.Hex(),
		FirstName: userInfo.Firstname,
	}
	c.JSON(http.StatusOK, deleteRes)
}

//delete by user id
func DeleteUserById(c *gin.Context) {
	var user models.User
	key := c.Param("id")
	docID, err := primitive.ObjectIDFromHex(key)
	if err != nil {
		fmt.Println(err.Error())
	}

	filter := bson.M{"_id": docID}
	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err = collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		log.Println(err.Error())
		if strings.Contains(err.Error(), "no document") { //if the error is related with document not found
			c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "server error"})
		}
		return
	}
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Println(err.Error())
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	filterForComments := bson.M{"userId": key}
	commentCollection := models.DB.Database("mella").Collection("comment")
	commentCollection.DeleteMany(ctx, filterForComments)
	//return object
	deleteRes := deleteResponse{
		Id:        user.ID.Hex(),
		FirstName: user.Firstname,
	}
	c.JSON(http.StatusOK, deleteRes)
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
	c.JSON(http.StatusOK, gin.H{"comment id": doc_id})
}

//invite user api(not done)
func InviteUser(c *gin.Context) {
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "invalid json",
		})
		c.Abort()
		return
	}

	err = user.HashPassword(user.Password)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "error hashing password",
		})
		c.Abort()
		return
	}
	var exists string
	err, exists = user.CreateUserRecord()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "error creating user",
		})
		c.Abort()
		return
	}
	if exists != "" {
		c.JSON(http.StatusForbidden, gin.H{"msg": exists})
		return
	} else {
		c.JSON(http.StatusOK, user)
	}
}
