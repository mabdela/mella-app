package mongodb

import (
	"context"
	"fmt"

	"github.com/mabdela/mella-backend/pkg/article"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (repo *ArticleRepo) CreateArticle(ctx context.Context) (*model.Article, error) {
	article := ctx.Value("article").(*model.Article)
	marticle := mongo_models.GetMArticle(article)
	iid, er := repo.Conn.Collection(state.ARTICLES).InsertOne(ctx, marticle)
	if er != nil {
		return nil, er
	}
	insertID := helper.ObjectIDFromInsertResult(iid)
	article.ID = insertID
	return article, nil
}

func (repo *ArticleRepo) DeleteArticleByID(ctx context.Context) error {
	articleID := ctx.Value("article_id").(string)
	oid, er := primitive.ObjectIDFromHex(articleID)
	if er != nil {
		return er
	}
	filter := bson.D{{"_id", oid}}
	dr, er := repo.Conn.Collection(state.ARTICLES).DeleteOne(ctx, filter)
	if er != nil || dr.DeletedCount == 0 {
		return fmt.Errorf("delete error while deleting an instance with id %s ", articleID)
	}
	return nil
}
