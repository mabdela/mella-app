package mongo_models

import (
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	MCourse struct {
		ID              primitive.ObjectID `bson:"_id,omitempty"`
		Title           string             `bson:"title"`
		TranslatedTitle string             `bson:"translated_title"`
		Imgurl          string             `bson:"imgurl,omitempty"`
		ArticleCount    int                `bson:"article_count,omitempty"`
		CreatedBy       string             `bson:"created_by,omitempty"`
		ChapterNumber   string             `bson:"chapter_number"`
	}

	MArticle struct {
		ID               primitive.ObjectID          `bson:"_id,omitempty"` // ID
		CourseID         string                      `bson:"course_id"`
		Title            string                      `bson:"title"` // Title
		TitleTranslation string                      `bson:"title_translation,omitempty"`
		Desc             []string                    `bson:"desc"` // Description
		Figure           *model.ImageWithDescription `bson:"figure,omitempty"`
		Subarticles      []*model.SubArticle         `bson:"sub_articles,omitempty"`
		ChapterID        string                      `bson:"chapterid"`
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

func (marticle *MArticle) GetArticle() *model.Article {
	ids := helper.ObjectIDStringFromObjectID(marticle.ID)
	return &model.Article{
		ID:               ids,
		CourseID:         marticle.CourseID,
		Title:            marticle.Title,
		TitleTranslation: marticle.TitleTranslation,
		Desc:             marticle.Desc,
		Figure:           marticle.Figure,
		Subarticles:      marticle.Subarticles,
		ChapterID:        marticle.ChapterID,
	}
}

func GetMArticle(article *model.Article) *MArticle {
	oid, _ := primitive.ObjectIDFromHex(article.ID)
	return &MArticle{
		ID:               oid,
		CourseID:         article.CourseID,
		Title:            article.Title,
		TitleTranslation: article.TitleTranslation,
		Desc:             article.Desc,
		Figure:           article.Figure,
		Subarticles:      article.Subarticles,
		ChapterID:        article.ChapterID,
	}
}
