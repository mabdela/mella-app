package quiz

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IQuizRepo interface {
	AddQuiz(ctx context.Context) (*model.Question , error)
	GetQuestion(ctx context.Context) (*model.Question , error)
}
