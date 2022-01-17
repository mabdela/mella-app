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
func (repo *QuizRepo) AddQuiz(ctx context.Context) bool {
	return true
	//here the insertion into the database will be implemented
}

//  func (repo *QuizRepo)GetQuestion(ctx context.Context) *model.Question {
//  	quiz := &model.Question{}
// 	 return quiz
//  }
