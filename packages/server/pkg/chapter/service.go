package chapter

// IChapterService .. a chapter service interface.
type IChapterService interface {
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
