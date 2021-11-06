package rest

import (
	"github.com/mabdela/mella-backend/pkg/comment"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
)

type IcommentHandler interface {
}
type CommentHandler struct {
	Authenticator auth.Authenticator
	CommentSer comment.ICommentService
}

func NewCommentHandler(auth auth.Authenticator , commentser comment.ICommentService)IcommentHandler{
	return &CommentHandler{
		Authenticator: auth,
		CommentSer: commentser,
	}
}

