package rest

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/chapter"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/course"
)

// IChapterHandler represents an interface for the ChapterHandler structure.
type IChapterHandler interface {
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
	if err != nil ||
		inp.CourseID == "" ||
		inp.ChapterNumber == 0 ||
		inp.Title == "" {
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
	ctx = context.WithValue(ctx, "chapter_id", inp)
	chapter, er := chah.Service.CreateChapter(ctx)
	if er != nil || chapter == nil {
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

func (chah *ChapterHandler) GetChapterByID(c *gin.Context) {
	ctx := c.Request.Context()
	chapterID := c.Query("id")
	print(chapterID, ctx)
}
