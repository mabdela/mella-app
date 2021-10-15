package models

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func InitDatabase() error {

	clientOptions := options.Client().ApplyURI("mongodb+srv://jeno:jeno1234@cluster0.ptoqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var err error
	DB, err = mongo.Connect(ctx, clientOptions)

	if err != nil {
		return err
	}

	return nil

}
