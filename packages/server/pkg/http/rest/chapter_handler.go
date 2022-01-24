package rest

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

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
	UpdateChapter(c *gin.Context)
	GetChaptersOfACourse(c *gin.Context)
	GetCourseOutline(c *gin.Context)
	// ------------------------------------------
	DeleteChapterByID(c *gin.Context)
	GetArticleOverviewsOfChapter(c *gin.Context)
	CountArticlesOfChapter(c *gin.Context)
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
	inp.CreatedAt = time.Now()
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
	in := &struct {
		Title string `json:"title"`
		ID    string `json:"id"`
	}{}
	resp := &struct {
		Chapter *model.Chapter `json:"course"`
		Updated bool           `json:"updated"`
	}{}
	eres := &struct {
		Error string `json:"error"`
	}{}

	jdec := json.NewDecoder(c.Request.Body)
	er := jdec.Decode(in)
	msgs := []string{
		" chapter id ", " title (length must be >= 5 characters)", "title(length must be >= 5 characters) and chapter id",
	}
	ctr := 0
	if er != nil || in.ID == "" || (in.Title == "" || (len(in.Title) < 4)) {
		if in.Title == "" || (len(in.Title) < 4) {
			ctr = ctr | 2
		}
		if in.ID == "" {
			ctr = ctr | 1
		}
		if ctr == 0 || er != nil {
			eres.Error = "invalid input"
		} else {
			eres.Error = msgs[ctr-1]
		}
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx := c.Request.Context()
	ctx = context.WithValue(ctx, "chapter_id", in.ID)
	chapter, er, _ := chah.Service.GetChapterByID(ctx)
	chapter.GetChapterIDFromObjectID()
	if er != nil || chapter.ID == "" {
		if er != nil {
			println(er.Error())
		}
		eres.Error = " not found "
		c.JSON(http.StatusNotFound, eres)
		return
	}
	if chapter.Title == in.Title {
		resp.Chapter = chapter
		resp.Updated = false
		c.JSON(http.StatusNotModified, resp)
		return
	}
	chapter.Title = in.Title
	ctx = context.WithValue(ctx, "chapter", chapter)
	success, er := chah.Service.UpdateChapter(ctx)
	if er != nil || !success {
		if er != nil {
			println(er.Error())
		}
		eres.Error = "no chapter was modified"
		c.JSON(http.StatusNotModified, eres)
		return
	}
	resp.Chapter = chapter
	resp.Updated = true
	c.JSON(http.StatusOK, resp)
}

func (chah *ChapterHandler) GetChaptersOfACourse(c *gin.Context) {
	ctx := c.Request.Context()
	courseID := c.Query("course_id")
	// outline, er := strconv.ParseBool(c.Query("outline"))
	// if er != nil {
	// 	outline = false
	// }
	eres := &struct {
		Error string `json:"error"`
	}{}
	res := &struct {
		CourseID string           `json:"course_id"`
		Chapters []*model.Chapter `json:"chapters"`
	}{}
	if courseID == "" {
		eres.Error = "\"course_id\" parameter value is missing"
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	var chapters []*model.Chapter
	var stcode int
	var er error

	ctx = context.WithValue(ctx, "course_id", courseID)
	// if outline {
	// 	chapter, er, stcode = chah.Service.OutlinedChaptersOfCourse(ctx)
	// } else {
	chapters, er, stcode = chah.Service.ChaptersOfACourse(ctx)
	// }
	if er != nil || stcode != state.OK {
		if stcode == state.NOT_FOUND {
			eres.Error = "not record found"
			c.JSON(http.StatusNotFound, eres)
			return
		} else if stcode == state.QUERY_ERROR {
			log.Println("Chapter Handler : 257 :: Query error ")
			eres.Error = " Internal problem!"
			c.JSON(http.StatusInternalServerError, eres)
			return
		} else {
			eres.Error = "problem happened"
			c.JSON(http.StatusInternalServerError, eres)
			return
		}
	}
	res.CourseID = courseID
	res.Chapters = chapters
	c.JSON(http.StatusOK, res)
}
func (chah *ChapterHandler) GetCourseOutline(c *gin.Context) {
	ctx := c.Request.Context()
	courseID := c.Query("course_id")
	eres := &struct {
		Error string `json:"error"`
	}{}
	res := &struct {
		CourseID string                 `json:"course_id"`
		Chapters []*model.ChapterDetail `json:"chapter_details"`
	}{}
	if courseID == "" {
		eres.Error = "\"course_id\" parameter value is missing"
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	var chapters []*model.ChapterDetail
	var stcode int
	var er error

	ctx = context.WithValue(ctx, "course_id", courseID)
	chapters, er, stcode = chah.Service.OutlinedChaptersOfCourse(ctx)
	if er != nil || stcode != state.OK {
		if stcode == state.NOT_FOUND {
			eres.Error = "not record found"
			c.JSON(http.StatusNotFound, eres)
			return
		} else if stcode == state.QUERY_ERROR {
			log.Println("Chapter Handler : 257 :: Query error ")
			eres.Error = " Internal problem!"
			c.JSON(http.StatusInternalServerError, eres)
			return
		} else {
			eres.Error = "problem happened"
			c.JSON(http.StatusInternalServerError, eres)
			return
		}
	}
	res.CourseID = courseID
	res.Chapters = chapters
	c.JSON(http.StatusOK, res)
}

func (chah *ChapterHandler) DeleteChapterByID(c *gin.Context) {
	chapterID := c.Query("id")
	ctx := c.Request.Context()
	res := &struct {
		ChapterID string `json:"chapter_id"`
		Msg       string `json:"msg"`
	}{}
	eres := &struct {
		Error string `json:"error"`
	}{}
	if chapterID == "" {
		eres.Error = "missing query value \"id\""
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx = context.WithValue(ctx, "chapter_id", chapterID)
	success, scode := chah.Service.DeleteChapterByID(ctx)
	if scode != state.OK || !success {
		switch scode {
		case state.INVALID_MONGODB_OBJECT_ID:
			{
				eres.Error = "invalid chapter id"
			}
		case state.NOT_FOUND:
			{
				eres.Error = "chapter with this id does not exist"
			}
		default:
			{
				eres.Error = "not deleted"
			}
		}
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	res.ChapterID = chapterID
	res.Msg = "successfully deleted"
	c.JSON(http.StatusOK, res)
}

func (chah *ChapterHandler) GetArticleOverviewsOfChapter(c *gin.Context) {
}

func (chah *ChapterHandler) CountArticlesOfChapter(c *gin.Context) {
}
