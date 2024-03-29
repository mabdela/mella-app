package article

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

type IArticleRepo interface {
	CreateArticle(ctx context.Context) (*model.Article, error)
	DeleteArticleByID(ctx context.Context) error
	UpdateArticle(ctx context.Context) (*model.Article, error)
	GetArticleByID(ctx context.Context) (*model.Article, error)
	GetArticleMainImage(ctx context.Context) (*model.ImageWithDescription, error)
	UpdateArticleMainImageByID(ctx context.Context) (*model.ImageWithDescription, error)
	GetSubArticleImage(ctx context.Context) (*model.ImageWithDescription, error, int)
	UpdateSubArticleImageByID(ctx context.Context) (*model.ImageWithDescription, error)
	SearchArticlesByTitle(ctx context.Context) ([]*model.ArticleOverview, error, int)
}
