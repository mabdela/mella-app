package mongodb

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/pkg/course"
	"github.com/mabdela/mella-backend/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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
func (repo *CourseRepo)RemoveCourse(ctx context.Context)(bool, error){
	courseId := ctx.Value("course_id").(string)
	oid , err := primitive.ObjectIDFromHex(courseId)
	if err!=nil{
		return false, err
	}
	filter:= bson.M{"_id":oid}
	_, err= repo.Conn.Collection(state.COURSES).DeleteOne(ctx,filter)
	if err!=nil{
		return false , err
	}
	return true , nil
}