package comment

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

type ICommentRepo interface {
	//to add new comment
	AddComments(ctx context.Context) (bool, error)
	LoadCommentsByArticle(ctx context.Context) (*[]model.Comment, error)
	UpdateCommentsLike(ctx context.Context) (bool, error)
	LoadComment(ctx context.Context) (*model.Comment, error)
	RemoveComment(ctx context.Context) (bool, error)
}
