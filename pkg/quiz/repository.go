package quiz

import (
	"context"
)

type IQuizRepo interface {
	AddQuiz(ctx context.Context) bool
	// GetQuestion(ctx context.Context) bool
}
