package model

import (
	"time"

	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// This is the Chapter model holding the information to
type Chapter struct {
	OID           primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	ID            string             `json:"id,omitempty" 		  bson:"id,omitempty"`
	CourseID      string             `json:"course_id"  		  bson:"course_id"`
	ChapterNumber uint               `json:"chapter_number" 	  bson:"chapter_number"`
	Title         string             `json:"title" 				  bson:"title"`
	CreatedAt     time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	ArticlesCount uint               `json:"articles_count" 	  bson:"articles_count"`
	// This introduction article id holds the reference to the introduction to this chapter
	// by default the first article if this chapter will be assumed as the first and introduction article.
	IntroductionArticleID string `json:"intro_article_id"  	  bson:"intro_article_id"`
}

func (ch *Chapter) GetChapterIDFromObjectID() {
	ch.ID = helper.ObjectIDStringFromObjectID(ch.OID)
}

// This is the OneCategory that is going to be presented in the side bar layout.
// this modewl will not be saved at the database.
type ChapterDetail struct {
	Chapter  *Chapter           `json:"chapter"`
	Articles []*ArticleOverview `json:"article_overview"`
}

// FullChapterInfo ...
type FullChapterInfo struct {
	ID                    string    `json:"id,omitempty"`
	Course                *Course   `json:"course_id"`
	ChapterNumber         uint      `json:"chapter_number"`
	Title                 string    `json:"title"`
	CreatedAt             time.Time `json:"created_at,omitempty"`
	ArticlesCount         uint      `json:"articles_count"`
	IntroductionArticleID string    `json:"intro_article_id"`
}
