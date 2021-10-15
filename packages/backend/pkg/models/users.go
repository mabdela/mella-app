package models

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Firstname string             `json:"firstname" bson:"firstname"`
	Lastname  string             `json:"lastname" bson:"lastname"`
	Email     string             `json:"email" bson:"email"`
	Password  string             `json:"password" bson:"password"`
}
type UserResponse struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Firstname string             `json:"firstname" bson:"firstname"`
	Lastname  string             `json:"lastname" bson:"lastname"`
	Email     string             `json:"email" bson:"email"`
}

func (user *User) CreateUserRecord() (err error, exists string) {

	err = InitDatabase()

	if err != nil {
		log.Println(err)
	}

	collection := DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	filter := bson.M{"email": user.Email}
	count, err := collection.CountDocuments(ctx, filter) // to make sure a user can't signin twise with a same email
	if err != nil {
		log.Println(err.Error())
		return err, ""
	}
	if count == 0 {
		insertResult, err := collection.InsertOne(ctx, user)
		fmt.Println("Inserted a single document: ", insertResult.InsertedID)
		if err != nil {
			return err, ""
		}
	} else {
		return nil, "The user record allready exists"
	}

	return nil, ""
}

func (user *User) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		return err
	}

	user.Password = string(bytes)
	return nil
}

func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}
