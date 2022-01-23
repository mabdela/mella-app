package chapter

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

// IChapterService .. a chapter service interface.
type IChapterService interface {
	// CreateChapter  uses "chapter"  *model.Chapter
	CreateChapter(ctx context.Context) (*model.Chapter, error)
	// GetChapterByTitleAndCourseID uses "course_id"  string and "chapter_title" string
	// and returns a chapter instance , error and status code .
	GetChapterByTitleAndCourseID(ctx context.Context) (*model.Chapter, error, int)
	// GetCourseIDByChapterID uses "chapter_id"
	GetCourseIDByChapterID(ctx context.Context) (string, error, int)
	// GetChapterByID uses "chapter_id"
	GetChapterByID(ctx context.Context) (*model.Chapter, error, int)
	// UpdateChapter uses "chapter" *model.Chapter instance to update the chapter.
	UpdateChapter(ctx context.Context) (bool, error)
}

// ChapterService ... a chapter service instance service class.
type ChapterService struct {
	Repo IChapterRepo
}

func NewChapterService(repo IChapterRepo) IChapterService {
	return &ChapterService{
		Repo: repo,
	}
}

func (chser *ChapterService) CreateChapter(ctx context.Context) (*model.Chapter, error) {
	return chser.Repo.CreateChapter(ctx)
}

func (chser *ChapterService) GetChapterByTitleAndCourseID(ctx context.Context) (*model.Chapter, error, int) {
	return chser.Repo.GetChapterByTitleAndCourseID(ctx)
}

func (chser *ChapterService) GetCourseIDByChapterID(ctx context.Context) (string, error, int) {
	return chser.Repo.GetCourseIDByChapterID(ctx)
}

// GetChapterByID ...
func (chser *ChapterService) GetChapterByID(ctx context.Context) (*model.Chapter, error, int) {
	return chser.Repo.GetChapterByID(ctx)
}

func (chser *ChapterService) UpdateChapter(ctx context.Context) (bool, error) {
	return chser.Repo.UpdateChapter(ctx)
}
