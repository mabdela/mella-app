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

	var user_respnse models.UserResponse
	user_respnse.Email = user.Email
	user_respnse.Firstname = user.Firstname
	user_respnse.Lastname = user.Lastname
	user_respnse.ID = user.ID

	c.JSON(http.StatusOK, user_respnse)

}
