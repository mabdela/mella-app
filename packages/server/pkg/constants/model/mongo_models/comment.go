package mongo_models

import (
	"time"

	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ( // This model is to be used only with mongodb to insert bson data.
	MCOmment struct {
		ID        primitive.ObjectID `bson:"_id,omitempty"`
		Content   string             `json:"content" 		bson:"content"`
		UserID    string             `json:"user_id"   	bson:"user_id"`
		ArticleId string             `json:"article_id"  	bson:"article_id"`
		Likes     []string           `json:"likes"   		bson:"likes"`
		Date      time.Time          `json:"date"  		bson:"date"`
	}
)

func GetMcomment(comment *model.Comment) *MCOmment {
	oid, _ := primitive.ObjectIDFromHex(comment.ID)

	return &MCOmment{
		ID:        oid,
		Content:   comment.Content,
		UserID:    comment.UserID,
		ArticleId: comment.ArticleId,
		Likes:     comment.Likes,
		Date:      comment.Date,
	}
}

func (mcomment *MCOmment) GetComment() *model.Comment {
	ids := helper.ObjectIDStringFromObjectID(mcomment.ID)
	return &model.Comment{
		ID:        ids,
		Content:   mcomment.Content,
		UserID:    mcomment.UserID,
		ArticleId: mcomment.ArticleId,
		Likes:     mcomment.Likes,
		Date:      mcomment.Date,
	}
}
