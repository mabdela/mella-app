package admin

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/auth"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type AdminLoginPayload struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}
type LoginResponse struct {
	Token string `json:"token"`
	Name  string `json:"name"`
	ID    string `json:"_id" bson:"_id,omitempty"`
}
type passwordChangePayload struct {
	Id          string `json:"id"`
	OldPassword string `json:"oldPassword"`
	NewPassword string `json:"newPassword"`
}

func (passwordPayload *passwordChangePayload) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		return err
	}

	passwordPayload.NewPassword = string(bytes)
	return nil
}

var adminModel AdminModel

func AdminLogin(c *gin.Context) {

	var payload AdminLoginPayload
	c.BindJSON(&payload)

	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err := collection.FindOne(ctx, bson.M{"email": payload.Email}).Decode(&adminModel)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "invalid user credentials",
		})

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
	jwtWrapper := auth.JwtWrapper{
		SecretKey:       "adminsecretekey",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(payload.Email)

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
		Name:  adminModel.FirstName,
		Token: signedToken,
		ID:    adminModel.ID.Hex(),
	}
	// fmt.Println(tokenResponse)
	c.JSON(http.StatusOK, tokenResponse)
}

func ChangePassword(c *gin.Context) {
	//this should only be available for an admin for his acount only
	var payload passwordChangePayload
	c.BindJSON(&payload)
	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	id, _ := primitive.ObjectIDFromHex(payload.Id)
	filter := bson.M{"_id": id}
	err := collection.FindOne(ctx, filter).Decode(&adminModel)
	fmt.Println(adminModel)
	if err != nil {
		if strings.Contains(err.Error(), "no documents") { //if the error is related with document not found
			c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "server error"})
		}
		return
	}
	err = adminModel.CheckPassword(payload.OldPassword)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "your email and password does not match",
		})
		c.Abort()
		return
	}
	//change password

	err = payload.HashPassword(payload.NewPassword)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "error hashing password",
		})
		c.Abort()
		return
	}
	change := bson.M{"$set": bson.M{"password": payload.NewPassword}}
	_, err = collection.UpdateOne(ctx, filter, change)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg":"error while updating"})
		return
	}
	//return
	collection.FindOne(ctx, filter).Decode(&adminModel)
	c.JSON(http.StatusOK, adminModel)
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
