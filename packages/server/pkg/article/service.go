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
	// UpdateArticle uses "article"   *model.Article to update the existing article.
	UpdateArticle(ctx context.Context) (*model.Article, error)
	// GetArticleByID  uses "article_id"  string to get the article instance using the ID.
	GetArticleByID(ctx context.Context) (*model.Article, error)
	// GetArticleMainImage uses "article_id"  string and returns article's profile image.
	GetArticleMainImage(ctx context.Context) (*model.ImageWithDescription, error)
	// UpdateArticleMainImageByID uses "article_id" string and "article_title_image_url" string
	UpdateArticleMainImageByID(ctx context.Context) (*model.ImageWithDescription, error)
	// GetSubArticleImage  uses "article_id" string, "subarticle_index" uint
	GetSubArticleImage(ctx context.Context) (*model.ImageWithDescription, error, int)
	// UpdateSubArticleImageByID uses
	// "subarticle_figure" *model.ImageWithDescription and
	// "article_id" string
	// "article_index"  uint
	UpdateSubArticleImageByID(ctx context.Context) (*model.ImageWithDescription, error)
	// SearchArticlesByTitle   uses "q" string to query list of articles.
	SearchArticlesByTitle(ctx context.Context) ([]*model.ArticleOverview, error, int)
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

func (aser *ArticleService) GetArticleMainImage(ctx context.Context) (*model.ImageWithDescription, error) {
	return aser.Repo.GetArticleMainImage(ctx)
}

// UpdateArticleMainImageByID ...
func (aser *ArticleService) UpdateArticleMainImageByID(ctx context.Context) (*model.ImageWithDescription, error) {
	return aser.Repo.UpdateArticleMainImageByID(ctx)
}

func (aser *ArticleService) GetSubArticleImage(ctx context.Context) (*model.ImageWithDescription, error, int) {
	return aser.Repo.GetSubArticleImage(ctx)
}
func (aser *ArticleService) UpdateSubArticleImageByID(ctx context.Context) (*model.ImageWithDescription, error) {
	return aser.Repo.UpdateSubArticleImageByID(ctx)
}
func (aser *ArticleService) SearchArticlesByTitle(ctx context.Context) ([]*model.ArticleOverview, error, int) {
	return aser.Repo.SearchArticlesByTitle(ctx)
}
