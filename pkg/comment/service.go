package comment

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type ICommentService interface {
	AddComments(ctx context.Context) (bool, error)
	LoadCommentsByArticle(ctx context.Context) (*[]model.Comment, error)
	UpdateCommentsLike(ctx context.Context)(bool , error)

}

type CommentService struct {
	Repo ICommentRepo
}

func NewCommentService(repo ICommentRepo) ICommentService {
	return &CommentService{repo}
}

func (commentser *CommentService) AddComments(ctx context.Context) (bool, error) {
	return commentser.Repo.AddComments(ctx)
}
func (commentser *CommentService) LoadCommentsByArticle(ctx context.Context) (*[]model.Comment , error){
	return commentser.Repo.LoadCommentsByArticle(ctx)
}
func (commentser *CommentService) UpdateCommentsLike(ctx context.Context)(bool , error){
	return commentser.Repo.UpdateCommentsLike(ctx)
}