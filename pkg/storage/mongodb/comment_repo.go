package mongodb

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/comment"
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
	// // return true
	// commentBody := ctx.Value("commentBody").(*mongo_models.MComment)
	// fmt.Println(commentBody)
	return true
}
