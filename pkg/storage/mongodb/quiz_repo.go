package mongodb

import (
	"github.com/mabdela/mella-backend/pkg/quiz"
	"go.mongodb.org/mongo-driver/mongo"
)

// QuizRepo a repository instance for quiz.
type QuizRepo struct {
	Conn *mongo.Database
}

func NewQuizRepo(conn *mongo.Database) quiz.IQuizRepo {
	return &QuizRepo{conn}
}
