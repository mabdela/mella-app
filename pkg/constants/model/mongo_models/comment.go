package mongo_models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ( // This model is to be used only with mongodb to insert bson data.
	MCOmment struct {
		ID      primitive.ObjectID `bson:"_id"`
		Content string             `json:"content" 		bson:"content"`
		UserID  string             `json:"user_id"   	bson:"user_id"`
		TopicID string             `json:"topic_id"  	bson:"topic_id"`
		Likes   []string           `json:"likes"   		bson:"likes"`
		Date    time.Time          `json:"date"  		bson:"date"`
	}
)
