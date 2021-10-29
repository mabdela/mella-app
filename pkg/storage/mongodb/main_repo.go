package mongodb

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectMongodb function to connect mongodb
func ConnectMongoDB() *mongo.Database {
	clientOption := options.Client().ApplyURI("mongodb://localhost:27017")
	client, era := mongo.Connect(context.TODO(), clientOption)
	if era != nil {
		log.Println(era)
		return nil
	}
	era = client.Ping(context.TODO(), nil)
	if era != nil {
		log.Println("Error WHILE PINGING ", era)
		return nil
	}
	return client.Database(os.Getenv("DB_NAME"))
}
