package article

type IArticleService interface {
}

type ArticleService struct {
	Repo IArticleRepo
}

func NewArticleService(repo IArticleRepo) IArticleService {
	return ArticleService{
		Repo: repo,
	}
}
