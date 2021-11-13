package article

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IArticleRepo interface {
	CreateArticle(ctx context.Context) (*model.Article, error)
	DeleteArticleByID(ctx context.Context) error
}
