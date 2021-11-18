package rest

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/article"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
	"github.com/mabdela/mella-backend/platforms/helper"
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
	// errs := c.Request.ParseMultipartForm(state.ARTICLES_FILE_SIZE)
	// if errs != nil {
	// 	println(" ParseMultipart Error  ", errs.Error())
	// }
	mr, err := c.Request.MultipartReader()
	if err != nil {
		println(" Multipart Reader Error : ", err.Error())
	}
	// mr stands for multipart reader .
	eres := &struct {
		Error string `json:"error"`
	}{
		"bad request body",
	}
	// this is a structure to send OK
	res := &struct {
		Msg     string         `json:"msg"`
		Article *model.Article `json:"article"`
	}{}
	println(res)
	// This is where we take the Input from the request JSON.
	if err != nil /* || errs != nil */ {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	var titleImage = []byte{}
	subTitleImages := map[int][]byte{}
	var titleImageName string

	var titleImageFile *os.File
	subArticleImages := map[int]*os.File{}
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
		pfileHeader := model.NewPartFileHeader(part.Header)
		if part.FormName() == "title" && pfileHeader != nil {
			// This is the files is the image for the articles main image.
			// the part is also the file.
			if titleImage != nil {
				eres.Error = fmt.Sprintf(` duplicate title image '%s' `, pfileHeader.GetFileName())
				c.JSON(http.StatusUnsupportedMediaType, eres)
				return
			}

			println("Using the Header as an Input ", pfileHeader.GetFileName())
			if helper.IsImage(pfileHeader.GetFileName()) {
				// This file is not an image.
				count, er := part.Read(titleImage)
				if er != nil || count == 0 {
					etyp := "invalid "
					if count == 0 {
						etyp = "empty "
					}
					eres.Error = fmt.Sprintf(" %s title image file '%s' ", etyp, pfileHeader.GetFileName())
					c.JSON(http.StatusUnsupportedMediaType, eres)
					return
				}
			} else {
				eres.Error = fmt.Sprintf(` '%s' Only image file types are allowed `, pfileHeader.GetFileName())
				c.JSON(http.StatusUnsupportedMediaType, eres)
				return
			}
		} else if strings.HasPrefix(part.FormName(), "subtitle") && pfileHeader != nil {
			val, erorr_subtitle_index := strconv.Atoi(strings.Replace(part.FormName(), "subtitle", "", 1))
			if erorr_subtitle_index != nil || val <= 0 {
				// This subtitle file is not valid.
				eres.Error = fmt.Sprintf(" '%s' is not a valid subtitle image name the key name should be like 'subtitle1'", part.FormName())
				c.JSON(http.StatusBadRequest, eres)
				return
			}
			if !(helper.IsImage(pfileHeader.GetFileName())) {
				// This file is not an image.
				eres.Error = fmt.Sprintf(" '%s' Only image file types are allowed ", helper.GetExtension(pfileHeader.GetFileName()))
				c.JSON(http.StatusUnsupportedMediaType, eres)
				return
			}
			// check whether the file exist in the files list or not.
			// if so , Jump the request with bad request message.
			vals := subTitleImages[val]
			if vals != nil {
				// There was a file with this sub article index. therefore,
				// we can not add this part file to the list of article's image.
				eres.Error = " duplicate image for single sub article is not allowed "
				c.JSON(http.StatusNotAcceptable, eres)
				return
			}
			// Add the file to the list of a
			subTitleImages[val] = []byte{}
			count, er := part.Read(subTitleImages[val])
			if er != nil || count == 0 {
				etyp := "invalid "
				if count == 0 {
					etyp = "empty "
				}
				eres.Error = fmt.Sprintf(" %s subtitle image file '%s' ", etyp, pfileHeader.GetFileName())
				c.JSON(http.StatusUnsupportedMediaType, eres)
				return
			}

		} else if part.FormName() == "data" {
			// This is the JSON data that we are supposed to unmarshal the title details from.
			jdecoder := json.NewDecoder(part)
			if decode_error := jdecoder.Decode(articleInput); decode_error != nil || articleInput == nil {
				// Error has happened while decoding the input.
				eres.Error = "payload for the article JSON data is not valid"
				c.JSON(http.StatusBadRequest, eres)
				return
			}
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
	// RULES for the SUB-ARTICLES
	/*
		1. sub article indes must not be repeated.
		2. article index value less than or equal to 0 is not acceptable.
		3. title , translated_title , and other things should not be missing
	*/
	subArticlesIndex := []int{}
	for _, sa := range articleInput.Subarticles {
		for _, sai := range subArticlesIndex {
			if sai == sa.Index {
				eres.Error = " suplicate sub article index"
				c.JSON(http.StatusBadRequest, eres)
				return
			}
		}
		if sa.Index <= 0 {
			c.JSON(http.StatusBadRequest, eres)
			return
		}
		// check whether the sub article has all the relevant article values.
		if sa.Subtitle == "" || sa.Datas == nil {
			v := 0
			vs := []string{" sub title ", " content ", " sub title and content "}
			if sa.Subtitle == "" {
				v = v | 1
			}
			if sa.Datas == nil {
				v = v | 2
			}
			eres.Error = fmt.Sprintf("missing important sub article content at article index %d %s", sa.Index, vs[v-1])
			c.JSON(http.StatusBadRequest, eres)
			return
		}
		subArticlesIndex = append(subArticlesIndex, sa.Index)
	}

	// create a file for the articles to save.
	if titleImage != nil {
		var error_title_image error
		ptitlefheader := model.NewPartFileHeader(titleImage.Header)
		titleImageName = state.ARTICLE_IMAGES_RELATIVE_PATH + helper.GenerateRandomString(7, helper.CHARACTERS) + "." + helper.GetExtension(ptitlefheader.GetFileName())
		titleImageFile, error_title_image = os.Create(os.Getenv("ASSETS_DIRECTORY") + titleImageName)
		if error_title_image != nil {
			log.Println(" Image Creation Error :  ", error_title_image.Error())
			eres.Error = " internal problem please try again"
			c.JSON(http.StatusInternalServerError, eres)
			return
		}
	}
	defer titleImageFile.Close()
	articleInput.Image = titleImageName
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
			psubarticlefileHeader := model.NewPartFileHeader(part.Header)
			filename :=
				state.SUBARTICLE_IMAGES_RELATIVE_PATH +
					helper.GenerateRandomString(6, helper.CHARACTERS) +
					"." + helper.GetExtension(psubarticlefileHeader.GetFileName())

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
					println("  ERROR : while saving sub title image  ", er.Error())
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
	} else {
		println("  ERROR while saving the title image ...  ", era.Error())
		// Internal Server Error there fore delete the article.
		ctx = context.WithValue(ctx, "article_id", article.ID)
		ahandler.Service.DeleteArticleByID(ctx)
		goto InternalServerErrorWhileSavingMessage
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

// what if sub articles of same index comes.
// what if the number of images exceed the numbers of sub articles.
// what if the subarticle1 image X
