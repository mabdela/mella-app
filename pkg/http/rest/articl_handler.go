package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/article"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
)

type IArticleHandler interface {
	CreateArticle(c *gin.Context)
}

type ArticleHandler struct {
	Service       article.IArticleService
	Authenticator auth.Authenticator
}

func NewArticleHandler(service article.IArticleService, authenticator auth.Authenticator) IArticleHandler {
	return &ArticleHandler{
		Service:       service,
		Authenticator: authenticator,
	}
}

func (ahandler *ArticleHandler) CreateArticle(c *gin.Context) {

}
