package comment

type ICommentService interface {
}

type CommentService struct {
	Repo ICommentRepo
}

func NewCommentService(repo ICommentRepo) ICommentService {
	return &CommentService{repo}
}
