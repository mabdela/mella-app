package superadmin

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/handlers/admin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

var adminArray []admin.AdminModel

func CreateAdmin(c *gin.Context) {
	var admin admin.AdminModel
	c.BindJSON(&admin)
	err := admin.HashPassword(admin.Password)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "error hashing password",
		})
		c.Abort()
		return
	}
	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	count, _ := collection.CountDocuments(ctx, bson.M{"email": admin.Email})
	if count < 1 {
		_, err := collection.InsertOne(ctx, admin)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
	} else {
		c.JSON(http.StatusForbidden, gin.H{"message": "acount exists"})
		return
	}
	//return

	filter := bson.M{}
	cursor, err := collection.Find(ctx, filter)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		cursor.Decode(&admin)
		adminArray = append(adminArray, admin)
	}
	cursor.Close(ctx)
	c.JSON(http.StatusOK, adminArray)
}

//uses email address to delete admins
func DeleteAdmin(c *gin.Context) {
	email := c.Param("email")
	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	_, err := collection.DeleteOne(ctx, bson.M{"email": email})
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "admin deleted"})
}

func AllAdmins(c *gin.Context) {
	var admins admin.AdminModel

	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	defer cursor.Close(ctx)
	var adminsArray []admin.AdminModel
	for cursor.Next(ctx) {
		err := cursor.Decode(&admins)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
		admins.Password = ""
		adminsArray = append(adminsArray, admins)
	}
	c.JSON(http.StatusOK, adminsArray)
}
