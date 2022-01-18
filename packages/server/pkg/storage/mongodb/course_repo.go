package mongodb

import (
	"context"
	"errors"
	"log"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/pkg/course"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CourseRepo struct {
	Conn *mongo.Database
}

func NewCourseRepo(conn *mongo.Database) course.ICourseRepo {
	return &CourseRepo{
		Conn: conn,
	}
}

func (crepo *CourseRepo) CreateCourse(ctx context.Context) (*model.Course, error) {
	course := ctx.Value("course").(*model.Course)
	icourse := mongo_models.GetMCourse(course)
	if ins, er := crepo.Conn.Collection(state.COURSES).InsertOne(ctx, icourse); er == nil && ins != nil {
		objid := helper.ObjectIDFromInsertResult(ins)
		course.ID = objid
		return course, nil
	} else {
		return course, nil
	}
}

func (repo *CourseRepo) GetCourseByID(ctx context.Context) (*model.Course, error) {
	courseID := ctx.Value("course_id").(string)
	oid, er := primitive.ObjectIDFromHex(courseID)
	if er != nil {
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	insCouse := &mongo_models.MCourse{}
	er = repo.Conn.Collection(state.COURSES).FindOne(ctx, filter).Decode(insCouse)
	if er != nil {
		return nil, er
	}
	return insCouse.GetCourse(), nil
}

func (repo *CourseRepo) UpdateCourse(ctx context.Context) (*model.Course, error) {
	course := ctx.Value("course").(*model.Course)
	oid, er := primitive.ObjectIDFromHex(course.ID)
	if er != nil {
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	update := bson.D{{
		"$set", bson.D{
			{"title", course.Title},
			{"translated_title", course.TranslatedTitle},
			{"imgurl", course.Imgurl},
			{"article_count", course.ArticleCount},
			{"created_by", course.CreatedBy},
		},
	},
	}
	_, er = repo.Conn.Collection(state.COURSES).UpdateOne(ctx, filter, update)
	if er != nil {
		return nil, er
	}
	return course, nil
}

func (repo *CourseRepo) ChangePicture(ctx context.Context) (string, error) {
	pictureUrl := ctx.Value("picture_url").(string)
	courseID := ctx.Value("course_id").(string)
	oid, er := primitive.ObjectIDFromHex(courseID)
	if er != nil {
		return "", er
	}
	filter := bson.D{{"_id", oid}}
	update := bson.D{{"$set", bson.D{{"imgurl", pictureUrl}}}}
	if uc, er := repo.Conn.
		Collection(state.COURSES).
		UpdateOne(ctx, filter, update); uc == nil || uc.
		ModifiedCount == 0 || er != nil {
		log.Println(er.Error())
		return "", er
	} else {
		return pictureUrl, nil
	}
}

func (repo *CourseRepo) GetCourseImageByID(ctx context.Context) (string, error) {
	courseID := ctx.Value("course_id").(string)
	if oid, er := primitive.ObjectIDFromHex(courseID); er == nil {
		filter := bson.D{{"_id", oid}}
		findOneOption := options.FindOne().SetProjection(bson.D{{"imgurl", 1}})
		insCouse := &mongo_models.MCourse{}
		if er := repo.Conn.Collection(state.COURSES).FindOne(ctx, filter, findOneOption).Decode((insCouse)); er != nil {
			log.Println(er.Error())
			return insCouse.Imgurl, er
		}
		return insCouse.Imgurl, nil
	} else {

		return "", er
	}
}
func (repo *CourseRepo) RemoveCourse(ctx context.Context) (bool, error) {
	courseId := ctx.Value("course_id").(string)
	oid, err := primitive.ObjectIDFromHex(courseId)
	if err != nil {
		return false, err
	}
	filter := bson.M{"_id": oid}
	_, err = repo.Conn.Collection(state.COURSES).DeleteOne(ctx, filter)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (repo *CourseRepo) GetAllCourses(ctx context.Context) ([]*model.Course, error) {
	courses := []*model.Course{}

	if cursor, er := repo.Conn.Collection(state.COURSES).Find(ctx, bson.M{}); cursor != nil && er == nil {
		for cursor.Next(ctx) {
			// course := &model.Course{}
			insCouse := &mongo_models.MCourse{}
			e := cursor.Decode(insCouse)
			if e == nil {
				courses = append(courses, insCouse.GetCourse())
			}
		}
		// fmt.Println(courses)
		return courses, nil
	} else {
		return courses, errors.New(" no record found ")
	}
}
