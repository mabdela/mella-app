package rest

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/comment"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
)

type IcommentHandler interface {
	AddComments(c *gin.Context)
	LoadComments(c *gin.Context)
	UpdateCommentsLike(c *gin.Context)
}
type CommentHandler struct {
	Authenticator auth.Authenticator
	CommentSer    comment.ICommentService
}

func NewCommentHandler(auth auth.Authenticator, commentser comment.ICommentService) IcommentHandler {
	return &CommentHandler{
		Authenticator: auth,
		CommentSer:    commentser,
	}
}
func (handler *CommentHandler) AddComments(c *gin.Context) {
	ctx := c.Request.Context()
	res := model.CommentRes{}
	input := &struct {
		Content   string `json:"content"`
		ArticleId string `json:"article_id"`
		UserId    string `json:"user_id" `
	}{}
	c.BindJSON(input)
	res.Success = false
	if input.Content == "" || input.ArticleId == "" || input.UserId == "" {
		if input.Content == "" {
			res.Message = "empty comment field!"
		}
		if input.ArticleId == "" {
			res.Message = "should have included topic id"
		}
		if input.UserId == "" {
			res.Message = " no user id included"
		}
		c.JSON(http.StatusForbidden, res)
	}
	commentBody := model.Comment{
		Content:   input.Content,
		UserID:    input.UserId,
		ArticleId: input.ArticleId,
		Likes:     []string{},
		Date:      time.Now(),
	}
	ctx = context.WithValue(ctx, "comment", &commentBody)
	success, err := handler.CommentSer.AddComments(ctx)
	if !success || err != nil {
		res.Message = "Comment Not added successfully"
		c.JSON(http.StatusConflict, res)
		return
	}
	res.Message = "successfully added a comment"
	res.Success = true
	c.JSON(http.StatusOK, res)
	//here we may add the respnse to have commentrespnse or boolean value and message only

	//not done
}
func (handler *CommentHandler) LoadComments(c *gin.Context) {
	// input := & struct{
	// 	ArticleId string `json:"article_id`
	// }{}
	// c.
	res := model.CommentRes{}
	articleId := c.Param("article_id")
	ctx := c.Request.Context()
	ctx = context.WithValue(ctx, "article_id", articleId)
	comments, err := handler.CommentSer.LoadCommentsByArticle(ctx)
	res.Success = false
	if err != nil {
		if strings.Contains(err.Error(), "no documents") {
			res.Message = "no docment"
			c.JSON(http.StatusNotFound, res)
			return
		} else {
			res.Message = "internal sever error"
			c.JSON(http.StatusInternalServerError, res)
			return
		}
	}
	res.Message = "successfully loaded the comments"
	res.Success = true
	res.Comments = *comments
	c.JSON(http.StatusOK, res)
}

func (handler *CommentHandler) UpdateCommentsLike(c *gin.Context) {
	input := &model.UpdateCommentInfo{}
	c.BindJSON(input)
	res := model.SimpleSuccessNotifier{}
	res.Success = false
	if input.CommentId == "" || input.UserId == "" {
		if input.CommentId == "" {
			res.Message = "should include comment Id"
		} else if input.UserId == "" {
			res.Message = "should include commenter Id"
		}
		c.JSON(http.StatusBadRequest, res)
	}
	ctx := c.Request.Context()
	ctx = context.WithValue(ctx, "commentInfo", input)
	success, err := handler.CommentSer.UpdateCommentsLike(ctx)
	if !success || err != nil {
		res.Message = "Internal Server Error"
		c.JSON(http.StatusInternalServerError, res)
		return
	}
	res.Message = "seccessfully added a like"
	res.Success = true
	c.JSON(http.StatusOK, res)
}
