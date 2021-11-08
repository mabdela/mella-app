package mongodb

import (
	"github.com/mabdela/mella-backend/pkg/article"
	"go.mongodb.org/mongo-driver/mongo"
)

type ArticleRepo struct {
	Conn *mongo.Database
}

func NewArticleRepo(conn *mongo.Database) article.IArticleRepo {
	return &ArticleRepo{
		Conn: conn,
	}
}
