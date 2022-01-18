package rest

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/article"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/auth"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
)

type IArticleHandler interface {
	// CreateArticle creates an article instance using a json input and for valid as a input.
	CreateArticle(c *gin.Context)
	// UpdateArticle  to update an article instance using a json input.
	UpdateArticle(c *gin.Context)
	// GetArticleByID to get an article instance ...
	GetArticleByID(c *gin.Context)
	// ChangeArticleImage  updating the article main image.
	ChangeArticleImage(c *gin.Context)
	ChangeSubArticleImage(c *gin.Context)
	// SearchArticle seraches for a string from the article that has  matche for
	// title , sub-title , title_translation  , translated_subtitle ,
	// and if a parameter all=true the search will include "descriptions" of each title.
	// this parameter include "offset"  and "limit" for paging.
	SearchArticle(c *gin.Context)
	//
	ListArticlesOfACourse(c *gin.Context)
	// DeleteArticleByID the authorization will be for
	// the admin  who craeted the article and the superadmins.
	DeleteArticleByID(c *gin.Context)
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

// Update Article JSON information ....
// UpdateArticle this handler function updates only the
func (ahandler *ArticleHandler) UpdateArticle(c *gin.Context) {
	ctx := c.Request.Context()
	articleInput := &model.Article{Subarticles: []*model.SubArticle{}}
	er := c.BindJSON(articleInput)

	eres := &struct {
		Error string `json:"error"`
	}{}
	// this is a structure to send OK
	res := &struct {
		Msg     string         `json:"msg"`
		Article *model.Article `json:"article"`
	}{}
	if er != nil {
		log.Println(er.Error())
		eres.Error = " bad request payload "
		if articleInput.ID == "" {
			eres.Error = " missing article id "
		}
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	importantDatas := []string{" title ", " description ", "title and description ", " course id ",
		"title and course id ", " description and course id ", " title  , description , and course id ",
		" article id ", " title and id ", " description and id ", " title , description , and id ",
		" course id and id ", " title , course id and id ", "  description  , course id and id ",
		"  title , description , course id  , and id ",
	}
	init := 0
	// check whether the article had  a valid data in it.
	if articleInput.ID == "" || articleInput.Title == "" || articleInput.CourseID == "" || articleInput.Desc == nil {
		if articleInput.Title == "" {
			init = init | 1
		}
		if articleInput.Desc == nil {
			init = init | 2
		}
		if articleInput.CourseID == "" {
			init = init | 4
		}
		if articleInput.ID == "" {
			init = init | 8
		}
		eres.Error = fmt.Sprintf("missing important data %s ", importantDatas[init-1])
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx = context.WithValue(ctx, "article_id", articleInput.ID)
	article, er := ahandler.Service.GetArticleByID(ctx)
	if er != nil || article == nil {
		eres.Error = " article instance not found "
		c.JSON(http.StatusNotFound, eres)
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
				eres.Error = " duplicate sub article index "
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
			eres.Error = fmt.Sprintf(" missing important sub article content at article index %d %s ", sa.Index, vs[v-1])
			c.JSON(http.StatusBadRequest, eres)
			return
		}
		subArticlesIndex = append(subArticlesIndex, sa.Index)
	}
	// Let's Save the Founded article file and Update it.
	ctx = context.WithValue(ctx, "article", articleInput)
	article, create_article_error := ahandler.Service.UpdateArticle(ctx)
	if create_article_error != nil || article == nil {
		eres.Error = " internal problem please try again "
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	res.Article = article
	res.Msg = "  article updated succesfully "
	c.JSON(http.StatusOK, res)
}

// what if sub articles of same index comes.
// what if the number of images exceed the numbers of sub articles.
// what if the subarticle1 image X

func (ahandler *ArticleHandler) CreateArticle(c *gin.Context) {
	ctx := c.Request.Context()
	articleInput := &model.InArticle{Subarticles: []*model.InSubArticle{}}
	eres := &struct {
		Error string `json:"error"`
	}{
		"bad request data ",
	}
	// this is a structure to send OK
	res := &struct {
		Msg     string         `json:"msg"`
		Article *model.Article `json:"article"`
	}{}
	err := c.Request.ParseMultipartForm(state.ARTICLES_FILE_SIZE)
	if err != nil /* || errs != nil */ {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	titleImageInfo := &model.MultipartData{}
	subArticleImages := map[int]*model.MultipartData{}

	var titleImageFile *os.File
	var subArticleImageFiles = map[int]*os.File{}

	jsonData := c.Request.FormValue("data")
	jdec := json.NewDecoder(bytes.NewBuffer([]byte(jsonData)))
	era := jdec.Decode(articleInput)
	if jsonData == "" || era != nil {
		eres.Error = eres.Error + " json data is not valid "
		c.JSON(http.StatusBadRequest, eres)
		return
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
				eres.Error = " suplicate sub article index "
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
			eres.Error = fmt.Sprintf(" missing important sub article content at article index %d %s ", sa.Index, vs[v-1])
			c.JSON(http.StatusBadRequest, eres)
			return
		}
		subArticlesIndex = append(subArticlesIndex, sa.Index)
	}
	// check the validity the article file and it's sub articles.
	titleImageInfo.File, titleImageInfo.Header, titleImageInfo.Error = c.Request.FormFile("title")
	if titleImageInfo.File != nil && titleImageInfo.Header != nil && titleImageInfo.Error == nil {
		if !helper.IsImage(titleImageInfo.Header.Filename) {
			eres.Error = fmt.Sprintf(` '%s' Only image file types are allowed `, titleImageInfo.Header.Filename)
			c.JSON(http.StatusUnsupportedMediaType, eres)
			return
		}
		var error_title_image error
		titleImageName := state.ARTICLE_IMAGES_RELATIVE_PATH + helper.GenerateRandomString(7, helper.CHARACTERS) + "." + helper.GetExtension(titleImageInfo.Header.Filename)
		titleImageFile, error_title_image = os.Create(os.Getenv("ASSETS_DIRECTORY") + titleImageName)
		if error_title_image != nil {
			log.Println(" Image Creation Error :  ", error_title_image.Error())
			eres.Error = " internal problem please try again "
			c.JSON(http.StatusInternalServerError, eres)
			return
		}

		articleInput.Figure = titleImageName
		defer titleImageFile.Close()
		defer titleImageInfo.File.Close()
	}

	if len(articleInput.Subarticles) > 0 {
		for index, subarticle := range articleInput.Subarticles {
			// check whether  the sub article is valid or not and delete it from the list.
			if subarticle.Index <= 0 {
				subarticle.Index = (index + 1)
			}
			sf := &model.MultipartData{}
			// get the file from the parsed form data
			sf.File, sf.Header, sf.Error = c.Request.FormFile("subtitle" + strconv.Itoa(subarticle.Index))
			if sf.File == nil || sf.Header == nil || sf.Error != nil {
				continue
			}
			defer sf.File.Close()
			filename :=
				state.SUBARTICLE_IMAGES_RELATIVE_PATH +
					helper.GenerateRandomString(6, helper.CHARACTERS) +
					"." + helper.GetExtension(sf.Header.Filename)
			file, ee := os.Create(os.Getenv("ASSETS_DIRECTORY") + filename)
			if ee != nil {
				eres.Error = " internal server error "
				c.JSON(http.StatusInternalServerError, eres)
				return
			}
			subArticleImageFiles[subarticle.Index] = file
			defer subArticleImageFiles[subarticle.Index].Close()
			subArticleImages[subarticle.Index] = sf
			subarticle.SubFigure = filename
		}
	}
	// Let's Save the Founded article file and Update it.
	ctx = context.WithValue(ctx, "article", articleInput.ToArticle())
	article, create_article_error := ahandler.Service.CreateArticle(ctx)
	if create_article_error != nil || article == nil {
		eres.Error = " internal problem please try again "
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	if article.Figure.Imageurl != "" && titleImageFile != nil && titleImageInfo != nil && titleImageInfo.File != nil && titleImageInfo.Header != nil && titleImageInfo.Error == nil {
		// Copying the article main image file to the file opened.
		copied, era := io.Copy(titleImageFile, titleImageInfo.File)
		if copied == 0 {
			log.Println("The Length of copied file 0 bytes")
		} else {
			log.Println("The Copied file length is ", strconv.Itoa(int(copied)))
		}
		if era == nil {
			for _, sub := range articleInput.Subarticles {
				if sub.SubFigure != "" {
					rfile := subArticleImages[sub.Index]
					_, er := io.Copy(subArticleImageFiles[sub.Index], rfile.File)
					if er != nil {
						println("  ERROR : while saving sub title image  ", er.Error())
						// Internal Server Error there fore delete the article.
						ctx = context.WithValue(ctx, "article_id", article.ID)
						ahandler.Service.DeleteArticleByID(ctx)
						log.Println("while deleting the article ... ")
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
			log.Println("while saving the sub title image ")
			goto InternalServerErrorWhileSavingMessage
		}
	} else if article.Figure.Imageurl != "" {
		article.Figure.Imageurl = ""
		ctx = context.WithValue(ctx, "article", article)
		article, _ = ahandler.Service.UpdateArticle(ctx)
		res.Article = article
		res.Msg = " article created with reduced files "
		c.JSON(http.StatusCreated, res)
		return
	}
	if article == nil {
		log.Println("internal server error while saving the data updated")
		goto InternalServerErrorWhileSavingMessage
	}
	log.Println("------- Article Created with some files -------------------")
	res.Article = article
	res.Msg = " article succesfully created"
	c.JSON(http.StatusCreated, res)
	return

InternalServerErrorWhileSavingMessage:
	{
		eres.Error = " internal problem . please try again "
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
}

func (ahandler *ArticleHandler) GetArticleByID(c *gin.Context) {
	articleID := c.Query("id")
	eres := &struct {
		Error string `json:"error"`
	}{" missing an article parameter query value 'id' "}
	if articleID == "" {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx := c.Request.Context()
	ctx = context.WithValue(ctx, "article_id", articleID)
	article, er := ahandler.Service.GetArticleByID(ctx)
	if article == nil || er != nil {
		eres.Error = "  article not found  "
		c.JSON(http.StatusNotFound, eres)
		return
	}
	c.JSON(http.StatusOK, article)
}

// This handler function inputs an image and a data containint a json which is to update the article image and description.
/*

	The Format of the Data is
	{
		"article_id" : "35834753j45i3u45i3dsgfhsd",
		"img_desc" : "This is the image description that will be used for describing the image of figure which is to be used in the web article."
	}

*/
func (ahandler *ArticleHandler) ChangeArticleImage(c *gin.Context) {
	ctx := c.Request.Context()
	articleImageChangeInfo := &struct {
		ArticleID      string `json:"article_id"`
		ImgDescription string `json:"img_desc,omitempty"`
	}{}
	// articleID := c.Request.FormValue("id")
	// articleDescription := c.Request.FormValue("article_description")
	eres := &struct {
		Error string `json:"error"`
	}{" missing an article parameter query value 'id' "}
	print(c.Request.FormValue("data"))
	jsonDecde := json.NewDecoder(bytes.NewBuffer([]byte(c.Request.FormValue("data"))))
	dere := jsonDecde.Decode(articleImageChangeInfo)
	if dere != nil {
		eres.Error = dere.Error()
		c.JSON(http.StatusBadRequest, eres)
		return
	}

	if articleImageChangeInfo.ArticleID == "" {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	// this is a structure to send OK
	res := &struct {
		ArticleID    string                      `json:"article_id"`
		ArticleImage *model.ImageWithDescription `json:"article_image"`
	}{}
	err := c.Request.ParseMultipartForm(state.ARTICLES_FILE_SIZE)
	if err != nil /* || errs != nil */ {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx = context.WithValue(ctx, "article_id", articleImageChangeInfo.ArticleID)
	oldProfilePic, erro := ahandler.Service.GetArticleMainImage(ctx)
	print("Old Picture Profile Picture  ", oldProfilePic)
	if erro != nil {
		eres.Error = "article not found "
		c.JSON(http.StatusNotFound, eres)
		return
	}
	articleImageWithDescription := &model.ImageWithDescription{}

	var titleImageFile *os.File
	titleImageInfo := &model.MultipartData{}
	titleImageInfo.File, titleImageInfo.Header, titleImageInfo.Error = c.Request.FormFile("image")
	if titleImageInfo.File == nil || titleImageInfo.Header == nil || titleImageInfo.Error != nil {
		// there is no valid image instance.
		// if the article description has changed or while there is article image available in the article,
		// then change the article description only.
		if (oldProfilePic.Description != articleImageChangeInfo.ImgDescription) || oldProfilePic.Imageurl != "" {
			// change the description.
			articleImageWithDescription.Description = articleImageChangeInfo.ImgDescription
			articleImageWithDescription.Imageurl = oldProfilePic.Imageurl
			ctx = context.WithValue(ctx, "article_title_image", articleImageWithDescription)
			ctx = context.WithValue(ctx, "article_id", articleImageChangeInfo.ArticleID)
			newArticlePicture, err := ahandler.Service.UpdateArticleMainImageByID(ctx)
			res.ArticleImage = newArticlePicture
			if err != nil {
				c.JSON(http.StatusInternalServerError, res)
			} else {
				c.JSON(http.StatusOK, res)
			}
			return
		} else if oldProfilePic.Description != articleImageChangeInfo.ImgDescription {
			eres.Error = " no update "
			c.JSON(http.StatusNotModified, eres)
			return
		}
		eres.Error = " error while extracting the media file "
		c.JSON(http.StatusUnsupportedMediaType, eres)
		return
	}
	defer titleImageInfo.File.Close()
	// check whether the file is an image or not. therefore
	if !helper.IsImage(titleImageInfo.Header.Filename) {
		eres.Error = " supported image files are " + `"jpeg", "png", "jpg", "gif",and "btmp" only `
		c.JSON(http.StatusUnsupportedMediaType, eres)
		return
	}
	// generate Random Name for the incloming image
	randomArticleName := state.ARTICLE_IMAGES_RELATIVE_PATH + helper.GenerateRandomString(6, helper.CHARACTERS) + "." + helper.GetExtension(titleImageInfo.Header.Filename)

	titleImageFile, erro = os.Create(os.Getenv("ASSETS_DIRECTORY") + randomArticleName)
	if titleImageFile == nil || erro != nil {
		if articleImageChangeInfo.ArticleID != "" && articleImageChangeInfo.ImgDescription != "" {
			// saving or Updating the article
			articleImageWithDescription.Description = articleImageChangeInfo.ImgDescription

		}
		eres.Error = " internal problem , please try again later "
		log.Println("Article Handler::Update Articles Picture :internal problem while creating article image ")
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	defer titleImageFile.Close()
	articleImageWithDescription.Description = articleImageChangeInfo.ImgDescription
	articleImageWithDescription.Imageurl = randomArticleName

	ctx = context.WithValue(ctx, "article_title_image", articleImageWithDescription)
	ctx = context.WithValue(ctx, "article_id", articleImageChangeInfo.ArticleID)
	newArticlePicture, erro := ahandler.Service.UpdateArticleMainImageByID(ctx)
	if erro != nil || newArticlePicture == nil {
		eres.Error = " internal problem , please try again later "
		log.Println("Article Handler::Update Articles Picture :article image update problem while saving the new image url")
		os.Remove(os.Getenv("ASSETS_DIRECTORY") + randomArticleName)
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	_, er := io.Copy(titleImageFile, titleImageInfo.File)
	if er != nil {
		eres.Error = " internal problem , please try again later "
		log.Println("Article Handler::Update Articles Picture : internal problem while copying the input file to the destination ")
		os.Remove(os.Getenv("ASSETS_DIRECTORY") + randomArticleName)
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	if oldProfilePic != nil && helper.IsImage(oldProfilePic.Imageurl) {
		os.Remove(os.Getenv("ASSETS_DIRECTORY") + oldProfilePic.Imageurl)
	}
	res.ArticleID = articleImageChangeInfo.ArticleID
	res.ArticleImage = newArticlePicture
	c.JSON(http.StatusOK, res)
}

// ------------------------------handler functions yet to be implemented ----------------

// This handler function works by using a form value and sub articles index.
//
func (ahandler *ArticleHandler) ChangeSubArticleImage(c *gin.Context) {
	ctx := c.Request.Context()
	articleImageChangeInfo := &struct {
		Ind            string `json:"index"`
		Index          int
		ArticleID      string `json:"article_id"`
		ImgDescription string `json:"img_desc,omitempty"`
	}{}
	var er error

	eres := &struct {
		Error string `json:"error"`
	}{" missing an article parameter query value 'id' "}
	print(c.Request.FormValue("data"))
	jsonDecde := json.NewDecoder(bytes.NewBuffer([]byte(c.Request.FormValue("data"))))
	dere := jsonDecde.Decode(articleImageChangeInfo)
	articleImageChangeInfo.Index, er = strconv.Atoi(articleImageChangeInfo.Ind)
	if dere != nil || er != nil || articleImageChangeInfo == nil || articleImageChangeInfo.Index == 0 {
		eres.Error = "bad request data"
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	if articleImageChangeInfo.ArticleID == "" || articleImageChangeInfo.Index == 0 {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	res := &struct {
		ArticleID    string                      `json:"subarticle_id"`
		ArticleImage *model.ImageWithDescription `json:"subarticle_image"`
	}{}
	err := c.Request.ParseMultipartForm(state.ARTICLES_FILE_SIZE)
	if err != nil {
		c.JSON(http.StatusBadRequest, eres)
		return
	}
	ctx = context.WithValue(ctx, "article_id", articleImageChangeInfo.ArticleID)
	ctx = context.WithValue(ctx, "subarticle_index", uint(articleImageChangeInfo.Index))
	oldProfilePic, erro, status := ahandler.Service.GetSubArticleImage(ctx)
	// print("Old Picture Profile Picture  ", oldProfilePic)
	if erro != nil {
		eres.Error = "article not found "
		if status == state.NOT_FOUND {
			c.JSON(http.StatusNotFound, eres)
		} else if status == state.BAD_REQUEST_VALUES {
			eres.Error = state.STATUS_CODES[status]
			c.JSON(http.StatusBadRequest, eres)
		} else {
			c.JSON(http.StatusBadRequest, eres)
		}
		return
	}

	subarticleImageWithDescription := &model.ImageWithDescription{}

	var titleImageFile *os.File
	titleImageInfo := &model.MultipartData{}
	titleImageInfo.File, titleImageInfo.Header, titleImageInfo.Error = c.Request.FormFile("image")
	if titleImageInfo.File == nil || titleImageInfo.Header == nil || titleImageInfo.Error != nil {
		// there is no valid image instance.
		// if the article description has changed or while there is article image available in the article,
		// then change the article description only.
		if (oldProfilePic.Description != articleImageChangeInfo.ImgDescription) || oldProfilePic.Imageurl != "" {
			// change the description.
			subarticleImageWithDescription.Description = articleImageChangeInfo.ImgDescription
			subarticleImageWithDescription.Imageurl = oldProfilePic.Imageurl
			ctx = context.WithValue(ctx, "subarticle_figure", subarticleImageWithDescription)
			ctx = context.WithValue(ctx, "article_index", uint(articleImageChangeInfo.Index))
			ctx = context.WithValue(ctx, "article_id", articleImageChangeInfo.ArticleID)
			newArticlePicture, err := ahandler.Service.UpdateSubArticleImageByID(ctx)
			res.ArticleImage = newArticlePicture
			if err != nil {
				c.JSON(http.StatusInternalServerError, res)
			} else {
				c.JSON(http.StatusOK, res)
			}
			return
		} else if oldProfilePic.Description != articleImageChangeInfo.ImgDescription {
			eres.Error = " no update "
			c.JSON(http.StatusNotModified, eres)
			return
		}
		eres.Error = " error while extracting the media file "
		c.JSON(http.StatusUnsupportedMediaType, eres)
		return
	}
	defer titleImageInfo.File.Close()
	// check whether the file is an image or not. therefore
	if !helper.IsImage(titleImageInfo.Header.Filename) {
		eres.Error = " supported image files are " + `"jpeg", "png", "jpg", "gif",and "btmp" only `
		c.JSON(http.StatusUnsupportedMediaType, eres)
		return
	}
	// generate Random Name for the incloming image
	randomArticleName := state.ARTICLE_IMAGES_RELATIVE_PATH + helper.GenerateRandomString(6, helper.CHARACTERS) + "." + helper.GetExtension(titleImageInfo.Header.Filename)
	titleImageFile, erro = os.Create(os.Getenv("ASSETS_DIRECTORY") + randomArticleName)
	if titleImageFile == nil || erro != nil {
		if erro != nil {
			println(erro.Error())
		}
		if articleImageChangeInfo.ArticleID != "" && articleImageChangeInfo.ImgDescription != "" {
			// saving or Updating the article
			subarticleImageWithDescription.Description = articleImageChangeInfo.ImgDescription
		}
		eres.Error = " internal problem , please try again later "
		log.Println("Article Handler::Update Articles Picture :internal problem while creating article image ")
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	defer titleImageFile.Close()
	subarticleImageWithDescription.Description = articleImageChangeInfo.ImgDescription
	subarticleImageWithDescription.Imageurl = randomArticleName
	ctx = context.WithValue(ctx, "subarticle_figure", subarticleImageWithDescription)
	ctx = context.WithValue(ctx, "article_index", uint(articleImageChangeInfo.Index))
	ctx = context.WithValue(ctx, "article_id", articleImageChangeInfo.ArticleID)
	newArticlePicture, erro := ahandler.Service.UpdateSubArticleImageByID(ctx)
	if erro != nil || newArticlePicture == nil {
		if erro != nil {
			println(erro.Error())
		}
		eres.Error = " internal problem , please try again later "
		log.Println("Article Handler::Update Sub Articles Picture :sub article image update problem while saving the new image url")
		os.Remove(os.Getenv("ASSETS_DIRECTORY") + randomArticleName)
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	_, er = io.Copy(titleImageFile, titleImageInfo.File)
	if er != nil {
		eres.Error = " internal problem , please try again later "
		log.Println("Article Handler::Update Articles Picture : internal problem while copying the input file to the destination ")
		os.Remove(os.Getenv("ASSETS_DIRECTORY") + randomArticleName)
		c.JSON(http.StatusInternalServerError, eres)
		return
	}
	if oldProfilePic != nil && helper.IsImage(oldProfilePic.Imageurl) {
		os.Remove(os.Getenv("ASSETS_DIRECTORY") + oldProfilePic.Imageurl)
	}
	res.ArticleID = articleImageChangeInfo.ArticleID
	res.ArticleImage = newArticlePicture
	c.JSON(http.StatusOK, res)
}

func (ahandler *ArticleHandler) SearchArticle(c *gin.Context) {
	q := c.Query("q")
	ctx := c.Request.Context()
	resp := &struct {
		model.Article
	}{}
	eresp := &struct {
		Error string `json:"error"`
	}{"bad query"}
	if q == "" {
		c.JSON(http.StatusBadRequest, eresp)
		return
	}
	ctx = context.WithValue(ctx, "q", q)
	articleInfos, errs, status := ahandler.Service.SearchArticlesByTitle(ctx)
	if errs != nil || status == state.NOT_FOUND {
		eresp.Error = "no article instance found"
		c.JSON(http.StatusNotFound, eresp)
	}else if status = state.INTERNAL_SERVER_ERROR {
		
	}
}

func (ahandler *ArticleHandler) SearchArticleByContent(c *gin.Context) {
	// searching article by content.
}

//
func (ahandler *ArticleHandler) ListArticlesOfACourse(c *gin.Context) {}

// DeleteArticleByID the authorization will be for
// the admin  who craeted the article and the superadmins.
func (ahandler *ArticleHandler) DeleteArticleByID(c *gin.Context) {}
