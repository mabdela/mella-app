package rest

import (
	"context"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/pkg/course"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
	"github.com/mabdela/mella-backend/platforms/helper"
)

type ICourseHandler interface {
	CreateCourse(c *gin.Context)
	UpdateCourse(c *gin.Context)
	UplodaCourseImage(c *gin.Context)
}

type CourseHandler struct {
	Service       course.ICourseService
	Authenticator auth.Authenticator
}

func NewCourseHandler(ser course.ICourseService, authenticator auth.Authenticator) ICourseHandler {
	return &CourseHandler{Service: ser, Authenticator: authenticator}
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
	if course == nil || err != nil {
		resp.Msg = "internal server error"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	resp.Succ = true //
	resp.Msg = "course updated succesfully"
	resp.Course = course
	c.JSON(http.StatusOK, resp)
}

// UplodaCourseImage  ..
func (coursehr *CourseHandler) UplodaCourseImage(c *gin.Context) {
	er := c.Request.ParseMultipartForm(99999999)
	resp := &struct {
		Msg    string `json:"msg"`
		Imgurl string `json:"imgurl"`
	}{"bad request paylocad ", ""}
	course_id := c.Query("id")
	if er != nil {
		c.JSON(http.StatusBadRequest, resp)
		return
	}
	if image, header, ero := c.Request.FormFile("image"); ero == nil && header != nil && image != nil {
		// check whether t  he file is image or not .
		if helper.IsImage(header.Filename) {
			extension := helper.GetExtension(header.Filename)
			randomname := helper.GenerateRandomString(7, helper.CHARACTERS)
			newimagename := state.COURSE_IMAGES_RELATIVE_PATH + randomname + "." + extension

			ctx := c.Request.Context()
			ctx = context.WithValue(ctx, "course_id", course_id)
			oldimageurl, _ := coursehr.Service.GetCourseImageByID(ctx)
			ctx = context.WithValue(ctx, "picture_url", newimagename)
			if url, era := coursehr.Service.ChangePicture(ctx); url == newimagename && era == nil {
				file, era := os.Create(os.Getenv("ASSETS_DIRECTORY") + newimagename)
				if era != nil {
					ctx = context.WithValue(ctx, "picture_url", oldimageurl)
					coursehr.Service.ChangePicture(ctx)
					resp.Msg = "temporary failure , Please try again later"
					c.JSON(http.StatusInternalServerError, resp)
					return
				}
				if _, ers := io.Copy(file, image); ers != nil {
					// remove the updated image
					ctx = context.WithValue(ctx, "picture_url", oldimageurl)
					coursehr.Service.ChangePicture(ctx)
					file.Close()
					os.Remove(os.Getenv("ASSETS_DIRECTORY") + newimagename)
					resp.Msg = "internal server error"
					c.JSON(http.StatusInternalServerError, resp)
				} else {
					file.Close()
					resp.Msg = "succesfilly updated"
					resp.Imgurl = url
					resp.Msg = "image succesfuly uploaded"
					c.JSON(http.StatusCreated, resp)
					return
				}
			} else {
				resp.Msg = "temporary failure , Please , try again later"
				c.JSON(http.StatusInternalServerError, resp)
				return
			}

		} else {
			resp.Msg = `image types with extenstion "jpeg", "png", "jpg", "gif", and "btmp" are supported `
			c.JSON(http.StatusUnsupportedMediaType, resp)
			return
		}
	} else {
		c.JSON(http.StatusBadRequest, resp)
	}
}

func (coursehr *CourseHandler) GetCourseByID(c *gin.Context) {

}

func (coursehr *CourseHandler) GetAllCourses(c *gin.Context) {

}

func (coursehr *CourseHandler) DeleteCourseByID(c *gin.Context) {

}
