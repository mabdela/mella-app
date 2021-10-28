package oauth


import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/mabdela/mella/pkg/auth"
	"github.com/mabdela/mella/pkg/handlers/user"
	"go.mongodb.org/mongo-driver/bson"
)
type Payload struct {
	Email     string `json:"email" bson:"email"`
	FirstName string `json:"first_name" bson:"first_name"`
	LastName  string `json:"last_name" bson:"last_name"`
}
func FacebookOauth(c *gin.Context) {
	// fmt.Println("inside facebook")
	
	var payload Payload
	c.BindJSON(&payload)
	fmt.Println("facebook payload ", payload)
	filter := bson.M{"email": payload.Email}
	collection := models.DB.Database("mella").Collection("facebook")
	ctx, _ := context.WithTimeout(context.Background(), time.Second*20)
	count, _ := collection.CountDocuments(ctx, filter)
	if count < 1 {
		collection.InsertOne(ctx, payload)
		//no file with this email
	} else {
		fmt.Println("User alredy exists")
		//file exsits
	}
	jwtWrapper := auth.JwtWrapper{
		SecretKey:       "verysecretkey",
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

	tokenResponse := user.LoginResponse{
		Name: payload.FirstName,
		// ID:    payload.ID.Hex(),
		Token: signedToken,
	}
	// fmt.Println(tokenResponse)
	c.JSON(http.StatusOK, tokenResponse)

}


