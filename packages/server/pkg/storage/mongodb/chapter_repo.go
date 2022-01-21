package mongodb

import (
	"context"
	"errors"

	"github.com/mabdela/mella-app/packages/server/pkg/chapter"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
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
