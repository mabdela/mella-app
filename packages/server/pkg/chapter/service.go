package chapter

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

// IChapterService .. a chapter service interface.
type IChapterService interface {
	CreateChapter(ctx context.Context) (*model.Chapter, error)
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
