package mongo_models

import (
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	MCourse struct {
		ID              primitive.ObjectID `bson:"_id,omitempty"`
		Title           string             `bson:"title"`
		TranslatedTitle string             `bson:"translated_title"`
		Imgurl          string             `bson:"imgurl"`
		ArticleCount    int                `bson:"article_count"`
		CreatedBy       string             `bson:"created_by"`
	}

	MArticle struct {
		ID          primitive.ObjectID `bson:"_id,omitempty"`
		CourseID    string             `bson:"course_id"`
		Title       string             `bson:"title"` // Title
		Desc        string             `bson:"desc"`  // Description
		Image       string             `bson:"imgage"`
		Subarticles []model.SubArticle `bson:"sub_articles"`
	}
)

func (mcourse *MCourse) GetCourse() *model.Course {
	return &model.Course{
		ID:              helper.ObjectIDStringFromObjectID(mcourse.ID),
		Title:           mcourse.Title,
		TranslatedTitle: mcourse.TranslatedTitle,
		Imgurl:          mcourse.Imgurl,
		ArticleCount:    mcourse.ArticleCount,
		CreatedBy:       mcourse.CreatedBy,
	}
}

func GetMCourse(course *model.Course) *MCourse {
	oid, _ := primitive.ObjectIDFromHex(course.ID)
	return &MCourse{
		ID:              oid,
		Title:           course.Title,
		TranslatedTitle: course.TranslatedTitle,
		Imgurl:          course.Imgurl,
		ArticleCount:    course.ArticleCount,
		CreatedBy:       course.CreatedBy,
	}
}
