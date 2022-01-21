package rest

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/chapter"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/pkg/course"
)

// IChapterHandler represents an interface for the ChapterHandler structure.
type IChapterHandler interface {
	CreateChapter(c *gin.Context)
	GetChapterByID(c *gin.Context)
}

type ChapterHandler struct {
	Service       chapter.IChapterService
	CourseService course.ICourseService
}

func NewChapterHandler(chapterService chapter.IChapterService,
	courseService course.ICourseService) IChapterHandler {
	return &ChapterHandler{
		Service:       chapterService,
		CourseService: courseService,
	}
}

func (chah *ChapterHandler) CreateChapter(c *gin.Context) {
	inp := &model.Chapter{}
	ctx := c.Request.Context()
	res := &struct {
		Message string         `json:"message"`
		Chapter *model.Chapter `json:"chapter"`
		Status  uint           `json:"status"`
	}{}
	eres := &struct {
		Error      string `json:"error"`
		StatusCode uint   `json:"status_code"`
	}{}
	dec := json.NewDecoder(c.Request.Body)
	err := dec.Decode(inp)

	misses := []string{
		"course id",
		"title",
		"course id and title",
	}
	temp := 0
	if err != nil ||
		inp.CourseID == "" ||
		// inp.ChapterNumber == 0 ||
		inp.Title == "" {
		if inp.CourseID == "" {
			temp = temp | 1
		}
		if inp.Title == "" {
			temp = temp | 2
		}
		eres.Error = misses[temp-1]
		eres.StatusCode = http.StatusBadRequest
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx = context.WithValue(ctx, "course_id", inp.CourseID)
	course, er := chah.CourseService.GetCourseByID(ctx)
	if er != nil {
		eres.Error = "course with id " + inp.CourseID + " does not exist"
		eres.StatusCode = http.StatusNotFound
		c.JSON(http.StatusNotFound, eres)
		return
	}

	// check whether the chapter title in this course already exist.
	// using a method get a chapter with this course_id and chapter_title
	ctx = context.WithValue(ctx, "chapter_title", inp.Title)
	ctx = context.WithValue(ctx, "course_id", inp.CourseID)
	chapter, _, _ := chah.Service.GetChapterByTitleAndCourseID(ctx)
	if chapter != nil {
		eres.Error = "chapter with this title already exist"
		eres.StatusCode = uint(http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, eres)
		return
	}
	course.ChapterNumber++
	inp.ChapterNumber = course.ChapterNumber
	ctx = context.WithValue(ctx, "course", course)
	course, er = chah.CourseService.UpdateCourse(ctx)
	if er != nil || course == nil {
		eres.Error = "error while updating "
		eres.StatusCode = http.StatusInternalServerError
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	ctx = context.WithValue(ctx, "chapter", inp)
	chapter, er = chah.Service.CreateChapter(ctx)
	if er != nil || chapter == nil {
		println(er.Error())
		eres.Error = "internal problem please try again"
		eres.StatusCode = http.StatusInternalServerError
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	res.Chapter = chapter
	res.Message = "succesfuly created"
	res.Status = http.StatusOK
	c.JSON(http.StatusOK, res)
}

// GetChapterByID ..
func (chah *ChapterHandler) GetChapterByID(c *gin.Context) {
	ctx := c.Request.Context()
	chapterID := c.Query("id")
	res := &struct {
		Chapter *model.Chapter `json:"chapter"`
		ID      string         `json:"id"`
	}{}
	eres := &struct {
		Error string `json:"error"`
	}{
		"bad request ",
	}
	if chapterID == "" {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	res.ID = chapterID
	var er error
	var scode int
	ctx = context.WithValue(ctx, "chapter_id", chapterID)
	res.Chapter, er, scode = chah.Service.GetChapterByID(ctx)
	if er != nil {
		switch scode {
		case state.NOT_FOUND:
			{
				log.Println("Chapter Record Not found with ID  ", chapterID)
			}
		case state.INVALID_MONGODB_OBJECT_ID:
			{
				log.Println("Invalid Mongodb ID ")
			}
		}
		eres.Error = "article with this id does not exist"
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	c.JSON(http.StatusOK, res)
}

func (chah *ChapterHandler) UpdateChapter(c *gin.Context) {

}
