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
	}

	MArticle struct {
		ID          primitive.ObjectID  `bson:"_id,omitempty"` // ID
		CourseID    string              `bson:"course_id"`
		Title       string              `bson:"title"` // Title
		Desc        map[string]string   `bson:"desc"`  // Description
		Image       string              `bson:"imgurl,omitempty"`
		Subarticles []*model.SubArticle `bson:"sub_articles,omitempty"`
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
		ID:          ids,
		CourseID:    marticle.CourseID,
		Title:       marticle.Title,
		Desc:        marticle.Desc,
		Image:       marticle.Image,
		Subarticles: marticle.Subarticles,
	}
}

func GetMArticle(article *model.Article) *MArticle {
	oid, _ := primitive.ObjectIDFromHex(article.ID)
	return &MArticle{
		ID:          oid,
		CourseID:    article.CourseID,
		Title:       article.Title,
		Desc:        article.Desc,
		Image:       article.Image,
		Subarticles: article.Subarticles,
	}
}
