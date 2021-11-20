package article

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IArticleService interface {
	// CreateSrticle uses "article" *model.Article to create an article instance.
	CreateArticle(ctx context.Context) (*model.Article, error)
	// DeleteArticleByID uses "article-id"  string to delete an article instance.
	DeleteArticleByID(ctx context.Context) bool
	// UpdateArticle uses "article"   *model.Article to update the existing article.
	UpdateArticle(ctx context.Context) (*model.Article, error)
	// GetArticleByID  uses "article_id"  string to get the article instance using the ID.
	GetArticleByID(ctx context.Context) (*model.Article, error)
	// GetArticleMainImage uses "article_id"  string and returns article's profile image.
	GetArticleMainImage(ctx context.Context) (string, error)
	// UpdateArticleMainImageByID uses "article_id" string and "article_title_image_url" string
	UpdateArticleMainImageByID(ctx context.Context) (string, error)
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

func (aser *ArticleService) UpdateArticle(ctx context.Context) (*model.Article, error) {
	return aser.Repo.UpdateArticle(ctx)
}

func (aser *ArticleService) GetArticleByID(ctx context.Context) (*model.Article, error) {
	return aser.Repo.GetArticleByID(ctx)
}

func (aser *ArticleService) GetArticleMainImage(ctx context.Context) (string, error) {
	return aser.Repo.GetArticleMainImage(ctx)
}

// UpdateArticleMainImageByID ...
func (aser *ArticleService) UpdateArticleMainImageByID(ctx context.Context) (string, error) {
	return aser.Repo.UpdateArticleMainImageByID(ctx)
}
