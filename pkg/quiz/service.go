package quiz

type IQuizService interface {
}

type QuizService struct {
	Repo IQuizRepo
}

func NewQuizService(repo IQuizRepo) IQuizService {
	return &QuizService{repo}
}
