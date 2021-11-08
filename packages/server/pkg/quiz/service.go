package quiz

import (
	"context"
)

type IQuizService interface {
	AddQuiz(ctx context.Context) bool
	// GetQuestion(ctx context.Context)(*model.Question , error)
}

type QuizService struct {
	Repo IQuizRepo
}

func NewQuizService(repo IQuizRepo) IQuizService {
	return &QuizService{repo}
}

func (quizser *QuizService) AddQuiz(ctx context.Context) bool {
	return quizser.Repo.AddQuiz(ctx)
}

// func (quizser *QuizService)GetQuestion(ctx context.Context) bool{
// 	return quizser.Repo.GetQuestion(ctx)
// }
