package mongodb

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/mabdela/mella-app/packages/server/pkg/article"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func (repo *ArticleRepo) UpdateArticle(ctx context.Context) (*model.Article, error) {
	article := ctx.Value("article").(*model.Article)
	oid, er := primitive.ObjectIDFromHex(article.ID)
	if er != nil {
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	if uc, er := repo.Conn.Collection(state.ARTICLES).UpdateOne(ctx, filter,
		bson.D{
			{"$set", bson.D{
				{"course_id", article.CourseID},
				{"title", article.Title},
				{"title_translation", article.TitleTranslation},
				{"desc", article.Desc},
				{"imgurl", article.Figure},
				{"sub_articles", article.Subarticles},
			}}}); uc.ModifiedCount != 0 && er == nil {
		return article, nil
	} else {
		if er != nil {
			return nil, er
		}
		return nil, errors.New("no article was updated")
	}
}

func (repo *ArticleRepo) GetArticleByID(ctx context.Context) (*model.Article, error) {
	oid, er := primitive.ObjectIDFromHex(ctx.Value("article_id").(string))
	if er != nil {
		log.Println(er.Error())
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	article := &(mongo_models.MArticle{Subarticles: []*model.SubArticle{}})
	if er = repo.Conn.Collection(state.ARTICLES).FindOne(ctx, filter).Decode(article); er == nil {
		return article.GetArticle(), nil
	} else {
		log.Println(er.Error())
		return nil, er
	}
}

func (repo *ArticleRepo) GetArticleMainImage(ctx context.Context) (*model.ImageWithDescription, error) {
	oid, er := primitive.ObjectIDFromHex(ctx.Value("article_id").(string))
	if er != nil {
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	findOneOption := options.FindOne().SetProjection(bson.D{{"imgurl", 1}})
	article := &(mongo_models.MArticle{Subarticles: []*model.SubArticle{}})
	if er = repo.Conn.Collection(state.ARTICLES).FindOne(ctx, filter, findOneOption).Decode(article); er == nil {
		return article.Figure, nil
	} else {
		log.Println(er.Error())
		return nil, er
	}
}

func (repo *ArticleRepo) UpdateArticleMainImageByID(ctx context.Context) (string, error) {
	oid, er := primitive.ObjectIDFromHex(ctx.Value("article_id").(string))
	if er != nil {
		return "", er
	}
	imgurl := ctx.Value("article_title_image_url").(string)
	filter := bson.D{{"_id", oid}}
	uc, err := repo.Conn.Collection(state.ARTICLES).UpdateOne(ctx, filter, bson.D{
		{"$set", bson.D{{"imgurl", imgurl}}},
	})
	if err != nil || uc.ModifiedCount == 0 {
		return "", fmt.Errorf("%d articles modified ", uc.ModifiedCount)
	}
	return imgurl, nil
}
