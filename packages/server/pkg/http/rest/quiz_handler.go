package rest

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/quiz"
)

type IQuizHandler interface {
	AddQuiz(c *gin.Context)
	ModifyQuiz(c *gin.Context)
	LoadQuiz(c *gin.Context)
	DeleteQuiz(c *gin.Context)
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

func (quizhandler QuizHandler) AddQuiz(c *gin.Context) {
	input := &struct {
		Topic_id    string              `json:"topic_id" `
		Question    string              `json:"question"`
		Choice      []string            `json:"choice"`
		Answer      int                 `json:"answer"`
		Explanation string              `json:"explanation"`
		Keywords    []map[string]string `json:"keywords"`
	}{}
	res := &model.SimpleSuccessNotifier{
		Success: false,
	}
	ctx := c.Request.Context()
	c.BindJSON(input)

	if(input.Topic_id==""||input.Question==""){
		res.Message = "reqired field is empty"
		c.JSON(http.StatusBadRequest,res)
		return
	}
	ctx = context.WithValue(ctx , "input" , input)
	
	//the rest is to add the input to the database 
}


func (quizhandler QuizHandler) LoadQuiz(c *gin.Context) {
	
}
func (quizhandler QuizHandler) DeleteQuiz(c *gin.Context) {

}
func (quizhandler QuizHandler) ModifyQuiz(c *gin.Context) {

}
