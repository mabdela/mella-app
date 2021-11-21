package rest

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/article"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/auth"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
)

type IArticleHandler interface {
	CreateArticle(c *gin.Context)
}

type ArticleHandler struct {
	Service       article.IArticleService
	Authenticator auth.Authenticator
}

func NewArticleHandler(service article.IArticleService, authenticator auth.Authenticator) IArticleHandler {
	return &ArticleHandler{
		Service:       service,
		Authenticator: authenticator,
	}
}

func (ahandler *ArticleHandler) CreateArticle(c *gin.Context) {
	// the input data will be received using the for post and the data inside will be collected synamically .
	// should include a message telling about
	// the [number of sub articles in the article ]
	// the sub articles and the article can have a picture.(there fore having an image in each article and sub article is optional ).
	// the article index will be decided dynamically .
	/* send the article and the sub article text data in a json and
	send the corresponding images in a separate request. */
	// let's search for a way to send a json and form file at the same time.
	ctx := c.Request.Context()
	errs := c.Request.ParseMultipartForm(state.ARTICLES_FILE_SIZE)
	mr, err := c.Request.MultipartReader()
	// mr stands for multipart reader .
	eres := &struct {
		Error string `json:"error"`
	}{"bad request body"}

	// this is a structure to send OK
	res := &struct {
		Msg     string         `json:"msg"`
		Article *model.Article `json:"article"`
	}{}
	println(res)
	// This is where we take the Input from the request JSON.
	if err != nil || errs != nil {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	var titleImage *multipart.Part
	var titleImageName string

	var titleImageFile *os.File
	var subTitleImages map[int]*multipart.Part
	var subArticleImages map[int]*os.File
	// multipartForm, ers := mr.ReadForm(state.ARTICLES_FILE_SIZE)
	// Loop for iterating the miltipart file parts.
	articleInput := &model.Article{Subarticles: []*model.SubArticle{}}
	for {
		part, per := mr.NextPart()
		// This is OK, no more parts
		if per == io.EOF {
			break
		}
		// Some error
		if err != nil {
			eres.Error = "payload internal server error "
			c.JSON(http.StatusBadRequest, eres)
			return
		}
		if part.FormName() == "title" {
			// This is the files is the image for the articles main image.
			// the part is also the file.
			oldFileName := part.FileName()
			if helper.IsImage(oldFileName) {
				// This file is not an image.
				titleImage = part
			}
			eres.Error = " \"title\" Only image file types are allowed "
			c.JSON(http.StatusUnsupportedMediaType, eres)
			return
		} else if strings.HasPrefix(part.FormName(), "subtitle") {

			val, erorr_subtitle_index := strconv.Atoi(strings.Replace(part.FormName(), "subtitle", "", 1))
			if erorr_subtitle_index != nil || val <= 0 {
				// This subtitle file is not valid.
				eres.Error = fmt.Sprintf("%s is not a valid subtitle image name the key name should be like \"subtitle1\"", part.FormName())
				c.JSON(http.StatusBadRequest, eres)
				return
			}
			if !(helper.IsImage(part.FormName())) {
				// This file is not an image.
				eres.Error = fmt.Sprintf(" \"%s\" Only image file types are allowed ", part.FormName())
				c.JSON(http.StatusUnsupportedMediaType, eres)
				return
			}
			// check whether the file exist in the files list or not.
			// if so , Jump the request with bad request message.
			vals := subTitleImages[val]
			if vals != nil {
				// There was a file with this sub article index. therefore,
				// we can not add this part file to the list of article's image.
				eres.Error = fmt.Sprintf(" duplicate image for single article is not allowed ")
				c.JSON(http.StatusNotAcceptable, eres)
				return
			}
			// Add the file to the list of a
			subTitleImages[val] = part
		} else if part.FormName() == "data" {
			// This is the JSON data that we are supposed to unmarshal the title details from.
			jdecoder := json.NewDecoder(part)
			if decode_error := jdecoder.Decode(articleInput); decode_error != nil || articleInput == nil {
				// Error has happened while decoding the input.
				eres.Error = "payload for the article JSON data is not valid"
				c.JSON(http.StatusBadRequest, eres)
				return
			}
			// now it is valid JSON.
		}
	}
	importantDatas := []string{" title ", " description ", "title and description ", " course id ", "title and course id ", " description and course id ", " title  , description , and course id "}
	init := 0
	// check whether the article had  a valid data in it.
	if articleInput.Title == "" || articleInput.CourseID == "" || articleInput.Desc == nil {
		if articleInput.Title == "" {
			init = init | 1
		}
		if articleInput.Desc == nil {
			init = init | 2
		}
		if articleInput.CourseID == "" {
			init = init | 4
		}
		eres.Error = fmt.Sprintf("missing important data %s ", importantDatas[init-1])
		c.JSON(http.StatusBadRequest, eres)
		return
	}

	if titleImage != nil {
		var error_title_image error
		titleImageName = state.ARTICLE_IMAGES_RELATIVE_PATH + helper.GenerateRandomString(7, helper.CHARACTERS) + "." + helper.GetExtension(titleImage.FormName())
		titleImageFile, error_title_image = os.Create(os.Getenv("ASSETS_DIRECTORY") + titleImageName)
		if error_title_image != nil {
			eres.Error = " internal problem please try again"
			c.JSON(http.StatusInternalServerError, eres)
			return
		}
		defer titleImageFile.Close()
	}
	articleInput.Image = titleImageName
	// -----------------------------------------------------------
	if len(articleInput.Subarticles) > 0 {
		for index, subarticle := range articleInput.Subarticles {
			// check whether  the sub article is valid or not and delete it from the list.

			if subarticle.Index == 0 {
				subarticle.Index = (index + 1)
			} else if subarticle.Index != (index + 1) {
				// what is the index
				articleInput.Subarticles = append(articleInput.Subarticles[:index], articleInput.Subarticles[index+1:]...)
				continue
			}
			part := subTitleImages[(index + 1)]
			filename :=
				state.ARTICLE_IMAGES_RELATIVE_PATH +
					helper.GenerateRandomString(6, helper.CHARACTERS) +
					"." + helper.GetExtension(part.FormName())

			if part != nil {
				file, ee := os.Create(os.Getenv("ASSETS_DIRECTORY") + filename)
				if ee != nil {
					eres.Error = "internal server error"
					c.JSON(http.StatusInternalServerError, eres)
					return
				}
				subArticleImages[(index + 1)] = file
				// Sub Article Images
				defer subArticleImages[(index + 1)].Close()
				// ------------------------------------------------------------
				subarticle.SubImage = filename
			} else {
				subarticle.SubImage = ""
			}
		}
	}
	// Let's Save the Founded article file and Update it.
	ctx = context.WithValue(ctx, "article", articleInput)
	article, create_article_error := ahandler.Service.CreateArticle(ctx)
	if create_article_error != nil || article == nil {
		eres.Error = " internal problem please try again "
		c.JSON(http.StatusInternalServerError, eres)
		return
	}

	// Copying the article main image file to the file opened.
	_, era := io.Copy(titleImageFile, titleImage)

	if era == nil {
		for index, sub := range articleInput.Subarticles {
			if sub.SubImage != "" {
				_, er := io.Copy(subArticleImages[(index+1)], subTitleImages[(index+1)])
				if er != nil {
					// Internal Server Error there fore delete the article .
					ctx = context.WithValue(ctx, "article_id", article.ID)
					ahandler.Service.DeleteArticleByID(ctx)
					goto InternalServerErrorWhileSavingMessage
				}
			}
		}
		res.Article = article
		res.Msg = " article succesfully created"
		c.JSON(http.StatusCreated, res)
		return
	}

InternalServerErrorWhileSavingMessage:
	{
		eres.Error = " internal problem . please try again "
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
}

// Update Article JSON information ....
// UpdateArticle this handler function updates only the
func (ahandler *ArticleHandler) UpdateArticle(c *gin.Context) {
	article := &model.Article{}
	er := c.BindJSON(article)
	eres := &struct {
		Error string `json:"error"`
	}{}
	if er != nil {
		eres.Error = " bad request payload "
		// ----------------------------------------------------------
		if article.ID == "" {
			eres.Error = " missing article id "
		}
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	// title  ,  description  , imgurl  , /

}
