package user

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func Profile(c *gin.Context) {
	var userResult models.User

	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	email, _ := c.Get("email")

	err := collection.FindOne(ctx, bson.M{"email": email}).Decode(&userResult)

	if err != nil {

		if strings.Contains(err.Error(), "no documents") {
			c.JSON(http.StatusNotFound, gin.H{
				"msg": "user not found",
			})

		} else {

			c.JSON(http.StatusInternalServerError, gin.H{
				"msg": "could not get user profile",
			})

		}

		c.Abort()
		return

	}

	userResult.Password = ""

	c.JSON(http.StatusOK, userResult)

}
