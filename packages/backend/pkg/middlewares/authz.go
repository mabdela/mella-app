package middlewares

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/auth"
	"github.com/mabdela/mella/pkg/handlers/admin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func Authz() gin.HandlerFunc {
	return func(c *gin.Context) {

		clientToken, err := c.Request.Cookie("jwt")

		if err != nil {
			log.Printf(err.Error())
		}

		log.Printf(clientToken.Name)

		//var token string

		if clientToken.Value == "" {
			c.JSON(http.StatusForbidden, "No Authorization header provided")
			c.Abort()
			return
		}

		// log.Printf("Token: %v", clientToken.Value)

		jwtWrapper := auth.JwtWrapper{
			SecretKey: "verysecretkey",
			Issuer:    "AuthService",
		}

		claims, err := jwtWrapper.ValidateToken(clientToken.Value)
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}
		c.Set("email", claims.Email)
		c.Next()
	}
}

// Admin Authorization
func BasicAuth() gin.HandlerFunc {

	var AdminSlice []admin.AdminModel
	var adminModel admin.AdminModel

	collection := models.DB.Database("mella").Collection("superAdmin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err.Error())
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		err := cursor.Decode(&adminModel)
		if err != nil {
			fmt.Println("error when decoding on comments :", err.Error())
		}
		AdminSlice = append(AdminSlice, adminModel)
	}
	cursor.Close(ctx)

	validUsersMap := gin.Accounts{"user": "password"}
	for index, _ := range AdminSlice {
		validUsersMap[AdminSlice[index].Username] = AdminSlice[index].Password
		index++
	}

	return gin.BasicAuth(validUsersMap)
}
