package superadmin

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/handlers/admin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "not found"})
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
	key := c.Param("id")
	id, _ := primitive.ObjectIDFromHex(key)
	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	_, err := collection.DeleteOne(ctx, bson.M{"_id": id})
	fmt.Println(id)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "not found"})
		return
	}
	// return
	cursor, _ := collection.Find(ctx, bson.M{})
	defer cursor.Close(ctx)
	var admin admin.AdminModel
	for cursor.Next(ctx) {
		cursor.Decode(&admin)
		adminArray = append(adminArray, admin)
	}
	cursor.Close(ctx)
	c.JSON(http.StatusOK, adminArray)
}

func AllAdmins(c *gin.Context) {
	var admins admin.AdminModel

	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "notfound"})
		return
	}
	defer cursor.Close(ctx)
	var adminsArray []admin.AdminModel
	for cursor.Next(ctx) {
		err := cursor.Decode(&admins)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "not found"})
			return
		}
		admins.Password = ""
		adminsArray = append(adminsArray, admins)
	}
	c.JSON(http.StatusOK, adminsArray)
}

func GetAdminByEmail(c *gin.Context) {
	var admins admin.AdminModel
	key := c.Param("email")
	filter := bson.M{"email": key}
	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err := collection.FindOne(ctx, filter).Decode(&admins)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "not found"})
		return
	}
	c.JSON(http.StatusOK, admins)
}

func GetAdminByName(c *gin.Context) {

	name := c.Param("name")
	var admins admin.AdminModel
	var adminsArray []admin.AdminModel
	filter := bson.M{"firstname": name}
	collection := models.DB.Database("mella").Collection("admin")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	cursor, err := collection.Find(ctx, filter)
	fmt.Println(cursor)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "no acount found"})
		return
	}
	defer cursor.Close(ctx)
	if cursor.RemainingBatchLength() == 0 {
		c.JSON(http.StatusInternalServerError, "no content")
		return
	}
	for cursor.Next(ctx) {
		err := cursor.Decode(&admins)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "not found"})
			return
		}
		admins.Password = ""
		adminsArray = append(adminsArray, admins)
	}
	cursor.Close(ctx)
	c.JSON(http.StatusOK, adminsArray)
}
