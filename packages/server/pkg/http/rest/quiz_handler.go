package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/quiz"
)

type IQuizHandler interface {
}

type QuizHandler struct {
	Service quiz.IQuizService
}

// QuizHandler a function to create a new quiz handler instance.
func NewQuizHandler(service quiz.IQuizService) IQuizHandler {
	return &QuizHandler{
		Service: service,
	}
}

func CreateQuiz(c *gin.Context) {
	// quiz := struct{

	// }{}
}
