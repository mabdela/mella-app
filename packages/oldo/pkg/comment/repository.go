package comment

import "context"

type ICommentRepo interface {
	//to add new comment
	AddComments(ctx context.Context) bool
}

