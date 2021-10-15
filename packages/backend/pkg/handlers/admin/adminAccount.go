package admin

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

type AdminLoginPayload struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}
type Response struct {
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
}

func AdminLogin(c *gin.Context) {

	var payload AdminLoginPayload
	c.BindJSON(&payload)
	var adminModel AdminModel

	collection := models.DB.Database("mella").Collection("superAdmin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err := collection.FindOne(ctx, bson.M{"email": payload.Email}).Decode(&adminModel)

	if err != nil {
		log.Println(err.Error())
		return
	}

	err = adminModel.CheckPassword(payload.Password)

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "invalid user credentials",
		})
		c.Abort()
		return
	}

	var response Response
	response.Username = adminModel.Username
	response.Password = adminModel.Password
	c.JSON(http.StatusOK, response)

}

func CreateAdmin(c *gin.Context) {

	var payload AdminModel

	c.BindJSON(&payload)
	err := payload.HashPassword(payload.Password)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "error hashing password",
		})
		c.Abort()
		return
	}
	collection := models.DB.Database("mella").Collection("superAdmin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	_, err = collection.InsertOne(ctx, payload)
	if err != nil {
		log.Println(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{"message": "added"})
}
