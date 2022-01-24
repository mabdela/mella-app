package chapter

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

// IChapterRepo is an interface representing the chapter repository instance.
type IChapterRepo interface {
	CreateChapter(ctx context.Context) (*model.Chapter, error)
	GetChapterByTitleAndCourseID(ctx context.Context) (*model.Chapter, error, int)
	GetCourseIDByChapterID(ctx context.Context) (string, error, int)
	GetChapterByID(ctx context.Context) (*model.Chapter, error, int)
	UpdateChapter(ctx context.Context) (bool, error)
	ChaptersOfACourse(ctx context.Context) ([]*model.Chapter, error, int)
	OutlinedChaptersOfCourse(ctx context.Context) ([]*model.ChapterDetail, error, int)
	DeleteChapterByID(ctx context.Context) (error, int)
}
