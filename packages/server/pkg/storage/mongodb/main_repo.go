package mongodb

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectMongodb function to connect mongodb
func ConnectMongoDB() *mongo.Database {
	clientOption := options.Client().ApplyURI("mongodb://localhost:27017")
	// clientOption := options.Client().ApplyURI("mongodb+srv://mella:<mellaye123>@cluster0.1cues.mongodb.net/test")
	
	// username := "mella"
	// password := "mellaye123"
	// clientOption := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@cluster0.ptoqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", username, password))
	
	// clientOption := options.Client().ApplyURI("mongodb+srv://mella:<mellaye123>@cluster0.1cues.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
	client, era := mongo.Connect(context.TODO(), clientOption)
	if era != nil {
		log.Println(era)
		return nil
	}
	ctx, _ := context.WithTimeout(context.Background(), time.Second*20)
	era = client.Ping(ctx, nil)
	if era != nil {
		log.Println("Error WHILE PINGING ", era)
		return nil
	}
	return client.Database(os.Getenv("DB_NAME"))
}
