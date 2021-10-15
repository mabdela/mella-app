package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// For outline section of the web app
type Outline struct {
	Outline []Topics `json:"outline"`
}

type Topics struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Priority int    `json:"priority"`
	Note     string `json:"note"`
	Path     string `json:"path"`
	Children []Topics
}

type Questions struct {
	Topic_id  string     `json:"topic_id" bson:"topic_id"`
	Questions []Question `json:"questions"`
}

type Question struct {
	Id          int                 `json:"id"`
	Question    string              `json:"question"`
	Choice      []string            `json:"choice"`
	Answer      int                 `json:"answer"`
	Explanation string              `json:"explanation"`
	Keywords    []map[string]string `json:"keywords"`
}

//GoogleResponse model for the google API response
type GoogleResponse struct {
	Id         string `josn:"id"`
	Email      string `json:"email"`
	Verfied    bool   `json:"verified_email"`
	Name       string `josn:"name"`
	First_Name string `json:"given_name"`
	Last_Name  bool   `json:"family_name"`
	Picture    string `json:"picture"`
	Language   string `json:"locale"`
}

//FacebookRespnse model for facebook API respnse
type FacebookResponse struct {
	Id         string          `josn:"id"`
	Name       string          `josn:"name"`
	Email      string          `json:"email"`
	First_Name string          `json:"first_name"`
	Last_Name  bool            `json:"last_name"`
	Picture    map[string]Data `json:"picture"`
	Language   string          `json:"language"`
}

type Data struct {
	Height  int    `json:"height"`
	Default bool   `json:"is_silhouette"`
	Url     string `json:"url"`
	Width   int    `json:"width"`
}

//Articles model
type Article struct {
	Id       string `json:"_id,omitempty" bson:"_id,omitempty"`
	Priority bool   `json:"priority,omitempty" bson:"priority,omitempty"`
	//Paragraph []Item
}

//to load and add comments
type CommentsLoad struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Content  string             `json:"content" bson:"content"`
	UserId   string             `json:"userId" bson:"userId"`
	Topic_id string             `json:"topic_id" bson:"topic_id"`
	Likes    []string           `json:"likes" bson:"likes"`
	Date     time.Time          `json:"date" bson: "date"`
}
type CommentsAdd struct {
	Content  string    `json:"content" bson:"content"`
	UserId   string    `json:"userId" bson:"userId"`
	Topic_id string    `json:"topic_id" bson:"topic_id"`
	Likes    []string  `json:"likes" bson:"likes"`
	Date     time.Time `json:"date" bson: "date"`
}

type CommentResponse struct {
	Comment_ID string    `json:"comment_id" bson:"comment_id,omitempty"`
	First_Name string    `json:"firstname" bson:"firstname"`
	Last_Name  string    `json:"lastname" bson:"lastname" `
	User_Id    string    `json:"user_id" bson:"user_id,omitempty"`
	Date       time.Time `json:"date"  bson:"date"`
	Likes      []string  `json:"likes"  bson:"likes"`
	Content    string    `json:"content" bson:"content"`
	Topic_id   string    `json:"topicId" bson:"topicId"`
}

//for storing Personal quiz informations
type QuizInfo struct {
	User_id   string         `json:"user_id" bson:"user_id"`
	Topic_id  string         `json:"topic_id" bson:"topic_id"`
	Questions []QuestionInfo `json:"questions" bson:"questions"`
}

type QuestionInfo struct {
	QuestionIndex int  `json:"question_index" bson:"question_index"`
	ChoiceIndex   int  `json:"choice_index" bson:"choice_index"`
	ClickedChoice bool `json:"clicked_choice" bson:"clicked_choice"`
	Valid         int  `json:"valid" bson:"valid"` //intially = -1 , invalid = 0 and valid =1
}
