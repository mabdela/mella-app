package rest

import "github.com/mabdela/mella-app/packages/server/pkg/chapter"

// IChapterHandler represents an interface for the ChapterHandler structure.
type IChapterHandler interface {
}

type ChapterHandler struct {
	Service chapter.IChapterService
}

func NewChapterHandler(chapterService chapter.IChapterService) IChapterHandler {
	return &ChapterHandler{
		Service: chapterService,
	}
}
