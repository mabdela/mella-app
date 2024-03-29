package user

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

func FetchUserInfo(c *gin.Context) {
	c.Header("type", "applicationJson")
	key := c.Param("user_id")
	// fmt.Println(key)
	docID, err := primitive.ObjectIDFromHex(key)
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(docID)
	filter := bson.M{"_id": docID}
	var user models.User
	db := models.DB
	collection := db.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err = collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		log.Println(err.Error())
	}

	var userResponse models.UserResponse
	userResponse.Email = user.Email
	userResponse.Firstname = user.Firstname
	userResponse.Lastname = user.Lastname
	userResponse.ID = user.ID

	c.JSON(http.StatusOK, userResponse)
}

type UserUpdatePayload struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Id        string `json:"id"`
}

func UpdateUser(c *gin.Context) {
	var payload UserUpdatePayload
	c.BindJSON(&payload)
	key,_:=primitive.ObjectIDFromHex(payload.Id)
	filter:=bson.M{"_id":key}
	update := bson.M{"$set": bson.M{"firstname": payload.FirstName, "lastname": payload.LastName}}
	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "something is wrong NOT UPDATED"})
		return
	}
	// return
	var user models.UserResponse
	err=collection.FindOne(ctx, bson.M{"_id": key}).Decode(&user)
	if err!=nil{
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	c.JSON(http.StatusOK, user)
}


