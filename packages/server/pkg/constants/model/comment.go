package model

import "time"

type (
	Comment struct {
		ID        string    `json:"id" bson:"_id"` // this is string
		Content   string    `json:"content"`
		UserID    string    `json:"user_id"`
		ArticleId string    `json:"article_id"`
		Likes     []string  `json:"likes"`
		Date      time.Time `json:"date"`
	}

	//comment response should include user information (firstname)
	//also should include articles ID

	CommentResponse struct {
		Comment_ID string `json:"comment_id" bson:"comment_id,omitempty"`
		First_Name string `json:"firstname" bson:"firstname"`
		Last_Name  string `json:"lastname" bson:"lastname" `
		// User_Id    string    `json:"user_id" bson:"user_id,omitempty"`
		Date      time.Time `json:"date"  bson:"date"`
		Likes     []string  `json:"likes"  bson:"likes"`
		Content   string    `json:"content" bson:"content"`
		ArticleId string    `json:"article_id" bson:"article_id"`
	}
	UpdateCommentInfo struct{
			UserId string `json:"user_id"`
			CommentId string `json:"comment_id"`
	}
)