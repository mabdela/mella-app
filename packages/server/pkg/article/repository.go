package article

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IArticleRepo interface {
	CreateArticle(ctx context.Context) (*model.Article, error)
	DeleteArticleByID(ctx context.Context) error
	UpdateArticle(ctx context.Context) (*model.Article, error)
	GetArticleByID(ctx context.Context) (*model.Article, error)
	GetArticleMainImage(ctx context.Context) (string, error)
	UpdateArticleMainImageByID(ctx context.Context) (string, error)
}
