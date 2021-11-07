package rest

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/course"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
)

type ICourseHandler interface {
	CreateCourse(c *gin.Context)
	UpdateCourse(c *gin.Context)
	RemoveCourse(c *gin.Context)
}

type CourseHandler struct {
	Service       course.ICourseService
	Authenticator auth.Authenticator
}

func NewCourseHandler(ser course.ICourseService, authenticator auth.Authenticator) ICourseHandler {
	return &CourseHandler{
		Service: ser, 
		Authenticator: authenticator,
	}
}

func (coursehr *CourseHandler) CreateCourse(c *gin.Context) {
	course := &model.Course{}
	ctx := c.Request.Context()
	er := c.BindJSON(course)
	resp :=
		&struct {
			Succ   bool          `json:"success"`
			Msg    string        `json:"msg"`
			Course *model.Course `json:"course"`
		}{}
	if er != nil || course.Title == "" || course.TranslatedTitle == "" {
		if er != nil {
			resp.Msg = " bad course payload "
		} else if course.Title == "" && course.TranslatedTitle == "" {
			resp.Msg = "course title and translated title must be submitted "
		} else if course.TranslatedTitle == "" {
			resp.Msg = "course translated title must be submitted "
		} else {
			resp.Msg = "course title must be submitted "
		}
		c.JSON(http.StatusBadRequest, resp)
		return
	}
	session := ctx.Value("session").(*model.Session)
	course.CreatedBy = session.ID
	course.ArticleCount = 0 //
	course.Imgurl = ""
	// ----
	ctx = context.WithValue(ctx, "course", course)
	course, err := coursehr.Service.CreateCourse(ctx)
	if course == nil || err != nil {
		resp.Msg = "internal server error"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	resp.Succ = true //
	resp.Msg = "course created succesfully"
	resp.Course = course
	c.JSON(http.StatusCreated, resp)
}

func (coursehr *CourseHandler) UpdateCourse(c *gin.Context) {
	course := &model.Course{}
	ctx := c.Request.Context()
	er := c.BindJSON(course)
	resp :=
		&struct {
			Succ   bool          `json:"success"`
			Msg    string        `json:"msg"`
			Course *model.Course `json:"course"`
		}{}
	if er != nil || course.ID == "" || (course.Title == "" && course.TranslatedTitle == "") {
		if er != nil {
			resp.Msg = " bad course payload "
		} else if course.ID == "" {
			resp.Msg = "course id must be submitted"
		} else {
			resp.Msg = "at least course title or translated title must be submitted "
		}
		c.JSON(http.StatusBadRequest, resp)
		return
	}
	// session := ctx.Value("session").(*model.Session)
	ctx = context.WithValue(ctx, "course_id", course.ID)
	oldCourse, er := coursehr.Service.GetCourseByID(ctx)
	if oldCourse == nil || er != nil {
		resp.Msg = "course not found"
		c.JSON(http.StatusNotFound, resp)
		return
	}
	changed := false
	if oldCourse.Title != course.Title && len(course.Title) > 4 {
		oldCourse.Title = course.Title
		changed = true
	}
	if oldCourse.TranslatedTitle != course.TranslatedTitle && len(course.TranslatedTitle) > 4 {
		oldCourse.Title = course.TranslatedTitle
		changed = true
	}

	if !changed {
		resp.Msg = "no modification to the course instance is made"
		c.JSON(http.StatusNotModified, resp)
		return
	}
	ctx = context.WithValue(ctx, "course", oldCourse)
	course, err := coursehr.Service.UpdateCourse(ctx)
	if course == nil || err != nil { //there is error
		resp.Msg = "internal server error"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	resp.Succ = true //
	resp.Msg = "course updated succesfully"
	resp.Course = course
	c.JSON(http.StatusOK, resp)
}

func (handler *CourseHandler) RemoveCourse(c *gin.Context){
	ctx := c.Request.Context()
	input:= &struct{
		CourseId string `json:"course_id"`
		}{}
	resp :=
		&struct {
			Succ   bool          `json:"success"`
			Msg    string        `json:"msg"`
		}{}
	err:=c.BindJSON(input)

	resp.Succ= false
	resp.Msg = ""
	if err!=nil || input.CourseId ==""{
		if err!=nil{
			resp.Msg ="Bad paylod"
		}else if input.CourseId ==""{
			resp.Msg = "empty Id field"
		}
		c.JSON(http.StatusBadRequest, resp)
		return
	}
	ctx = context.WithValue(ctx, "course_id", input.CourseId)
	response , err := handler.Service.RemoveCourse(ctx)
	if response == false || err != nil {
		resp.Msg = "internal server error"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	resp.Succ = true //
	resp.Msg = "course deleted succesfully"
	
	c.JSON(http.StatusOK, resp)
}