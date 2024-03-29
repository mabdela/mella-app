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
	// clientOption := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@cluster0.ptoqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", os.Getenv("MONGODB_USERNAME"), os.Getenv("MONGODB_PASSWORD")))
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
