package models

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
)

func TestHashPassword(t *testing.T) {

	user := User{
		Password: "secret",
	}

	err := user.HashPassword(user.Password)
	assert.NoError(t, err)
	os.Setenv("passwordHash", user.Password)

}

func TestCreateUserRecord(t *testing.T) {

	user := User{
		Firstname: "Test",
		Lastname:  "User",
		Email:     "test@email.com",
		Password:  os.Getenv("passwordHash"),
	}

	err, _ := user.CreateUserRecord()

	var userResult User

	collection := DB.Database("mella").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)

	err = collection.FindOne(ctx, bson.M{"email": "test@email.com"}).Decode(&userResult)

	assert.NoError(t, err)

	assert.Equal(t, "Test", userResult.Firstname)
	assert.Equal(t, "User", userResult.Lastname)
	assert.Equal(t, "test@email.com", userResult.Email)

}

func TestCheckPassword(t *testing.T) {
	hash := os.Getenv("passwordHash")

	user := User{
		Password: hash,
	}

	err := user.CheckPassword("secret")
	assert.NoError(t, err)
}
