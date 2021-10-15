package user

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/mabdela/mella/pkg/auth"
	"go.mongodb.org/mongo-driver/bson"
)

type LoginPayload struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
	Name  string `json:"name"`
	ID    string `json:"_id" bson:"_id,omitempty"`
}

func Login(c *gin.Context) {

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(http.StatusNoContent)
		return
	}
	var payload LoginPayload

	err := c.ShouldBindJSON(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "invalid json",
		})
		c.Abort()
		return
	}

	var userResult models.User

	collection := models.DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	err = collection.FindOne(ctx, bson.M{"email": payload.Email}).Decode(&userResult)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "invalid user credentials",
		})
		c.Abort()
		return
	}

	err = userResult.CheckPassword(payload.Password)

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "invalid user credentials",
		})
		c.Abort()
		return
	}

	jwtWrapper := auth.JwtWrapper{
		SecretKey:       "verysecretkey",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(userResult.Email)

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "error signing token",
		})
		c.Abort()
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)

	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "jwt",
		Value:    signedToken,
		Path:     "/",
		Expires:  expirationTime,
		HttpOnly: true,
	})

	tokenResponse := LoginResponse{
		Name:  userResult.Firstname,
		ID:    userResult.ID.Hex(),
		Token: signedToken,
	}
	fmt.Println(tokenResponse)
	c.JSON(http.StatusOK, tokenResponse)
	return
}

func Signup(c *gin.Context) {
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

func Logout(c *gin.Context) {

	cookie := http.Cookie{
		Name:     "jwt",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	}

	http.SetCookie(c.Writer, &cookie)

	c.JSON(http.StatusOK, gin.H{
		"msg": "Successfully logged out user",
	})

}
