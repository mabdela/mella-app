package mongodb

import (
	"context"
	"fmt"

	"github.com/mabdela/mella-backend/pkg/comment"
	"github.com/mabdela/mella-backend/pkg/constants/model/mongo_models"
	"go.mongodb.org/mongo-driver/mongo"
)

type CommentRepo struct {
	Conn *mongo.Database
}

func NewCommentRepo(conn *mongo.Database) comment.ICommentRepo {
	return &CommentRepo{
		Conn: conn,
	}
}

func (repo *CommentRepo) AddComments(ctx context.Context) bool {
	// return true
	commentBody := ctx.Value("commentBody").(*mongo_models.MCOmment)
	fmt.Println(commentBody)
	return true
}
