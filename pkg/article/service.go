package article

type IArticleService interface {
}

type ArticleService struct {
}

func NewArticleService() IArticleService {
	return ArticleService{}
}
