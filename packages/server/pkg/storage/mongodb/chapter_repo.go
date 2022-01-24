package mongodb

import (
	"context"
	"errors"
	"fmt"

	"github.com/mabdela/mella-app/packages/server/pkg/chapter"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ChapterRepo struct {
	Conn *mongo.Database
}

func NewChapterRepo(conn *mongo.Database) chapter.IChapterRepo {
	return &ChapterRepo{
		Conn: conn,
	}
}

func (repo *ChapterRepo) CreateChapter(ctx context.Context) (*model.Chapter, error) {
	chapter := ctx.Value("chapter").(*model.Chapter)

	insID, er := repo.Conn.Collection(state.CHAPTER).InsertOne(ctx, chapter)
	if er != nil || insID == nil {
		if er != nil {
			return nil, er
		}
		return nil, errors.New("internal problem")
	}
	insertID := helper.ObjectIDFromInsertResult(insID)
	chapter.ID = insertID
	chapter.OID = insID.InsertedID.(primitive.ObjectID)
	return chapter, nil
}

func (repo *ChapterRepo) GetChapterByTitleAndCourseID(ctx context.Context) (*model.Chapter, error, int) {
	chapterTitle := ctx.Value("chapter_title").(string)
	courseID := ctx.Value("course_id").(string)
	chapter := &model.Chapter{}
	filter := bson.D{
		{"courseid", courseID},
		{"title", chapterTitle}}
	if er := repo.Conn.Collection(state.CHAPTER).FindOne(ctx, filter).Decode(chapter); er == nil {
		return chapter, nil, state.OK
	} else {
		return nil, er, state.NOT_FOUND
	}
}

func (repo *ChapterRepo) GetCourseIDByChapterID(ctx context.Context) (string, error, int) {
	chapterID := ctx.Value("chapter_id").(string)
	oid, er := primitive.ObjectIDFromHex(chapterID)
	if er != nil {
		return "", er, state.INVALID_MONGODB_OBJECT_ID
	}
	filter := bson.D{{"_id", oid}}

	chapter := &model.Chapter{}
	findOneOption := options.FindOne().SetProjection(bson.D{{"courseid", 1}})
	if er := repo.Conn.Collection(state.CHAPTER).FindOne(ctx, filter, findOneOption).Decode(chapter); er == nil {
		if chapter.CourseID == "" {
			return "", errors.New(state.STATUS_CODES[state.NOT_FOUND]), state.NOT_FOUND
		}
		return chapter.CourseID, nil, state.OK
	} else {
		return "", er, state.NOT_FOUND
	}
}

func (repo *ChapterRepo) GetChapterByID(ctx context.Context) (*model.Chapter, error, int) {
	chapterID := ctx.Value("chapter_id").(string)
	oid, er := primitive.ObjectIDFromHex(chapterID)
	if er != nil {
		return nil, er, state.INVALID_MONGODB_OBJECT_ID
	}
	filter := bson.D{{"_id", oid}}
	chapter := &model.Chapter{}
	if er := repo.Conn.Collection(state.CHAPTER).FindOne(ctx, filter).Decode(chapter); er != nil {
		return nil, er, state.NOT_FOUND
	}
	return chapter, nil, state.OK
}

func (repo *ChapterRepo) UpdateChapter(ctx context.Context) (bool, error) {
	chapter := ctx.Value("chapter").(*model.Chapter)
	println("Chapter Updated ", chapter.Title)
	oid, er := primitive.ObjectIDFromHex(chapter.ID)
	if er != nil {
		return false, er
	}
	filter := bson.D{{"_id", oid}}
	if uc, er := repo.Conn.Collection(state.CHAPTER).UpdateOne(ctx, filter, bson.D{{"$set",
		bson.D{
			{"title", chapter.Title},
		}}}); er != nil || uc.ModifiedCount == 0 {
		return false, errors.New("no record was updated")
	}
	return true, nil
}

func (repo *ChapterRepo) ChaptersOfACourse(ctx context.Context) ([]*model.Chapter, error, int) {
	courseID := ctx.Value("course_id").(string)
	filter := bson.D{{"courseid", courseID}}
	rows, er := repo.Conn.Collection(state.CHAPTER).Find(ctx, filter)
	if er != nil || rows == nil {
		if er != nil {
			return nil, er, state.QUERY_ERROR
		}
		return nil, fmt.Errorf("no record was found"), state.NOT_FOUND
	}
	chapters := []*model.Chapter{}
	for rows.Next(ctx) {
		chapter := &model.Chapter{}
		eer := rows.Decode(chapter)
		if eer == nil {
			chapters = append(chapters, chapter)
		}
	}
	if len(chapters) == 0 {
		return chapters, errors.New("not found"), state.NOT_FOUND
	}
	return chapters, nil, state.OK
}

func (repo *ChapterRepo) OutlinedChaptersOfCourse(ctx context.Context) ([]*model.ChapterDetail, error, int) {
	courseID := ctx.Value("course_id").(string)
	filter := bson.D{{"courseid", courseID}}
	rows, er := repo.Conn.Collection(state.CHAPTER).Find(ctx, filter)
	if er != nil || rows == nil {
		if er != nil {
			return nil, er, state.QUERY_ERROR
		}
		return nil, fmt.Errorf("no record was found"), state.NOT_FOUND
	}
	chapters := []*model.ChapterDetail{}
	for rows.Next(ctx) {
		chapter := &model.ChapterDetail{}
		eer := rows.Decode(&(chapter.Chapter))
		articleOverviews := []*model.ArticleOverview{}
		if eer == nil {
			// getting the articles
			chapter.Chapter.GetChapterIDFromObjectID()
			fil := bson.D{{"chapterid", chapter.Chapter.ID}}
			resu, err := repo.Conn.Collection(state.ARTICLES).Find(ctx, fil)
			if err == nil && resu != nil {
				for resu.Next(ctx) {
					arti := &mongo_models.MArticle{}
					er := resu.Decode(arti)
					if er == nil {
						articleOverviews = append(articleOverviews, arti.GetArticle().GetArticleOverview())
					}
				}
				chapter.Articles = articleOverviews
			} else {
				chapter.Articles = []*model.ArticleOverview{}
			}
			chapters = append(chapters, chapter)
		}
	}
	if len(chapters) == 0 {
		return chapters, errors.New("not found"), state.NOT_FOUND
	}
	return chapters, nil, state.OK
}
