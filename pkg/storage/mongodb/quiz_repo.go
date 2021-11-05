package mongodb

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/quiz"
	"go.mongodb.org/mongo-driver/mongo"
)

type QuizRepo struct {
	Conn *mongo.Database
}

// NewAdminRepo ...
func NewQuizRepo(conn *mongo.Database) quiz.IQuizRepo {
	return &QuizRepo{
		Conn: conn,
	}
}
func (repo *quiz.IQuizRepo)AddQuiz(ctx context.Context) bool{
	return true
}

func (repo *quiz.IQuizRepo)GetQuestion(ctx context.Context) bool{
	return true
}
