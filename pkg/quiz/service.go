package quiz

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IQuizService interface {
	AddQuiz(ctx context.Context)(*model.Question, error)
	GetQuestion(ctx context.Context)(*model.Question , error)
}

type QuizService struct {
	Repo IQuizRepo
}

func NewQuizService(repo IQuizRepo) IQuizService {
	return &QuizService{repo}
}

func (quizser *QuizService)AddQuiz(ctx context.Context) (*model.Question,error){
	return quizser.Repo.AddQuiz(ctx)
}
func (quizser *QuizService)GetQuestion(ctx context.Context) (*model.Question , error){
	return quizser.Repo.GetQuestion(ctx)
}