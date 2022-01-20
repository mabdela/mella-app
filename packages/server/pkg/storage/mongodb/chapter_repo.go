package mongodb

import (
	"context"
	"errors"

	"github.com/mabdela/mella-app/packages/server/pkg/chapter"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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
