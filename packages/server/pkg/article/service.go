package article

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

type IArticleService interface {
	// CreateSrticle uses "article" *model.Article to create an article instance.
	CreateArticle(ctx context.Context) (*model.Article, error)
	// DeleteArticleByID uses "article-id"  string to delete an article instance.
	DeleteArticleByID(ctx context.Context) bool
}

type ArticleService struct {
	Repo IArticleRepo
}

func NewArticleService(repo IArticleRepo) IArticleService {
	return &ArticleService{
		Repo: repo,
	}
}

func (aser *ArticleService) CreateArticle(ctx context.Context) (*model.Article, error) {
	return aser.Repo.CreateArticle(ctx)
}

func (aser *ArticleService) DeleteArticleByID(ctx context.Context) bool {
	return aser.Repo.DeleteArticleByID(ctx) == nil
}
