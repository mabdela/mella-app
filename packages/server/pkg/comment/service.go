package comment

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type ICommentService interface {
	AddComments(ctx context.Context) (bool, error)
	LoadCommentsByArticle(ctx context.Context) (*[]model.Comment, error)
	UpdateCommentsLike(ctx context.Context)(bool , error)
	RemoveComment(ctx context.Context)(bool , error)
	LoadComment(ctx context.Context)(*model.Comment , error)
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

func (commentser *CommentService) RemoveComment(ctx context.Context)(bool , error){
	return commentser.Repo.RemoveComment(ctx)
}

func (commentser *CommentService)LoadComment(ctx context.Context)(*model.Comment , error){
	return commentser.Repo.LoadComment(ctx)
}