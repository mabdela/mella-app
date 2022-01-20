package chapter

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

// IChapterRepo is an interface representing the chapter repository instance.
type IChapterRepo interface {
	CreateChapter(ctx context.Context) (*model.Chapter, error)
}
