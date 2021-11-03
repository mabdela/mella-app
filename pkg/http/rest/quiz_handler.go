type IQuizHandler interface{
	AddQuiz(c *gin.Context)
	GetQuestion(c *gin.Context)
}

type QuizHandler struct {
	Authenticator auth.Authenticator
	QuizSer quiz.IQuizService
}

func NewQuizHandler(auths auth.Authenticator , quizser quiz.IQuizService) IQuizHandler{
	return &QuizHandler{
		Authenticator: auths,
		QuizSer: quizser
	}
}

func (quizhr *QuizHandler) AddQuiz(c *gin.Context){
   //write handler function
}

func (quizhr *QuizHandler) GetQuestion(c *gin.Context){
	//write handler function
}