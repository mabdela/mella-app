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

func (repo *ArticleRepo) UpdateArticleMainImageByID(ctx context.Context) (*model.ImageWithDescription, error) {
	oid, er := primitive.ObjectIDFromHex(ctx.Value("article_id").(string))
	if er != nil {
		return nil, er
	}
	imgurl := ctx.Value("article_title_image").(*model.ImageWithDescription)
	filter := bson.D{{"_id", oid}}
	uc, err := repo.Conn.Collection(state.ARTICLES).UpdateOne(ctx, filter, bson.D{
		{"$set", bson.D{{"figure", imgurl}}},
	})
	if err != nil || uc.ModifiedCount == 0 {
		return nil, fmt.Errorf("%d articles modified ", uc.ModifiedCount)
	}
	return imgurl, nil
}

func (repo *ArticleRepo) GetSubArticleImage(ctx context.Context) (*model.ImageWithDescription, error, int) {
	oid, ers := primitive.ObjectIDFromHex(ctx.Value("article_id").(string))
	index := ctx.Value("subarticle_index").(uint)
	println(" The Index is ", index)
	if ers != nil || index <= 0 {
		return nil, errors.New(state.STATUS_CODES[state.BAD_REQUEST_VALUES]), state.BAD_REQUEST_VALUES
	}
	subarticles := []*model.SubArticle{}
	filter := bson.D{{"_id", oid}}
	findOneOption := options.FindOne().SetProjection(bson.D{{"sub_articles", 1}})
	article := &(mongo_models.MArticle{Subarticles: []*model.SubArticle{}})

	if err := repo.Conn.Collection(state.ARTICLES).FindOne(ctx, filter, findOneOption).Decode(article); err == nil {
		subarticles = article.Subarticles
		for _, sa := range subarticles {
			if uint(sa.Index) == index {
				if sa.SubFigure == nil {
					return &model.ImageWithDescription{}, nil, state.OK
				}
				return sa.SubFigure, nil, state.OK
			}
		}
		return nil, errors.New(" sub article with the specified index not found  "), state.NOT_FOUND
	} else {
		println("The Error is : ", err.Error())
		return nil, errors.New("article_repo:151: error while querying the subarticle "), state.QUERY_ERROR
	}
}

func (repo *ArticleRepo) UpdateSubArticleImageByID(ctx context.Context) (*model.ImageWithDescription, error) {
	oid, ers := primitive.ObjectIDFromHex(ctx.Value("article_id").(string))
	index := ctx.Value("subarticle_index").(uint)
	if ers != nil || index <= 0 {
		return nil, errors.New(state.STATUS_CODES[state.BAD_REQUEST_VALUES])
	}
	subarticles := []*model.SubArticle{}
	imgurl := ctx.Value("subarticle_figure").(*model.ImageWithDescription)
	filter := bson.D{{"_id", oid}}
	article := &(mongo_models.MArticle{Subarticles: []*model.SubArticle{}})
	if err := repo.Conn.Collection(state.ARTICLES).FindOne(ctx, filter).Decode(article); err == nil {
		subarticles = article.Subarticles
		changed := false
		for _, sa := range subarticles {
			if uint(sa.Index) == index {
				sa.SubFigure = imgurl
				changed = true
			}
		}
		if !changed {
			return nil, errors.New(" no sub article is motified ")
		}
		uc, err := repo.Conn.Collection(state.ARTICLES).UpdateOne(ctx, filter, bson.D{
			{"$set", bson.D{{"sub_articles", subarticles}}},
		})
		if err != nil || uc.ModifiedCount == 0 {
			return nil, fmt.Errorf(" sub article is modified ", uc.ModifiedCount)
		}
		return imgurl, nil
	} else {
		return nil, errors.New("no article was found")
	}
}

func (repo *ArticleRepo) SearchArticlesByTitle(ctx context.Context) ([]*model.ArticleOverview, error, int) {
	q := ctx.Value("q").(string)
	limit := ctx.Value("limit").(uint)
	offset := ctx.Value("offset").(uint)
	courseID := ctx.Value("course_id").(string)
	chapterID := ctx.Value("chapter_id").(string)
	create := func(val int64) *int64 {
		return &val
	}
	articleOverviews := []*model.ArticleOverview{}

	offsetAndLimit := struct {
		Offset *int64
		Limit  *int64
	}{
		Offset: create(int64(offset)),
		Limit:  create(int64(limit)),
	}
	var filter primitive.M
	if courseID != "" && chapterID != "" {
		filter = bson.M{"$text": bson.D{{"$search", q + "*"}},
			"course_id": courseID, "chapter_id": chapterID}
	} else if courseID != "" && chapterID == "" {
		filter = bson.M{"$text": bson.D{{"$search", q + "*"}},
			"course_id": courseID}
	} else if courseID == "" && chapterID == "" {
		filter = bson.M{"$text": bson.D{{"$search", q + "*"}}}
	} else if courseID == "" && chapterID != "" {
		filter = bson.M{"$text": bson.D{{"$search", q + "*"}}, "chapter_id": chapterID}
	} else {
		filter = bson.M{"$text": bson.D{{"$search", q + "*"}}}
	}
	resu, err := repo.Conn.Collection(state.ARTICLES).Find(ctx, filter, &options.FindOptions{Limit: offsetAndLimit.Limit}, &options.FindOptions{Skip: offsetAndLimit.Offset})
	if err == nil && resu != nil {
		for resu.Next(ctx) {
			arti := &mongo_models.MArticle{}
			er := resu.Decode(arti)
			if er != nil {
				articleOverviews = append(articleOverviews, arti.GetArticle().GetArticleOverview())
			}
		}
		if len(articleOverviews) == 0 {
			return articleOverviews, nil, state.NOT_FOUND
		}
		return articleOverviews, nil, state.OK
	} else {
		return articleOverviews, err, state.QUERY_ERROR
	}
}
