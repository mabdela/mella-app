package mongodb

import (
	"context"
	"fmt"

	"github.com/mabdela/mella-backend/pkg/comment"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/model/mongo_models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CommentRepo struct {
	Conn *mongo.Database
}

func NewCommentRepo(conn *mongo.Database) comment.ICommentRepo {
	return &CommentRepo{
		Conn: conn,
	}
}

func (repo *CommentRepo) AddComments(ctx context.Context) (bool, error) {
	tobeInseted := ctx.Value("comment").(*model.Comment)
	commentInsert := mongo_models.GetMcomment(tobeInseted)
	_, err := repo.Conn.Collection("comment").InsertOne(context.TODO(), commentInsert)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (repo *CommentRepo) LoadCommentsByArticle(ctx context.Context) (*[]model.Comment, error) {
	articleId := ctx.Value("article_id")
	commentArray := []model.Comment{}
	filter := bson.M{"articleid": articleId}
	cursor, err := repo.Conn.Collection("comment").Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	comment := &model.Comment{}
	for cursor.Next(context.TODO()) {
		cursor.Decode(comment)
		commentArray = append(commentArray, *comment)
	}
	cursor.Close(context.TODO())
	return &commentArray, nil
}
func (repo *CommentRepo) UpdateCommentsLike(ctx context.Context) (bool ,error) {
	collection:=repo.Conn.Collection("comment")
	commentInfo := ctx.Value("commentInfo").(*model.UpdateCommentInfo)
	doc_comment_ID, err := primitive.ObjectIDFromHex(commentInfo.CommentId)
	if err != nil {
		return false ,err
	}
	find := bson.M{"_id": doc_comment_ID, "likes": commentInfo.UserId}
	count , err := collection.CountDocuments(context.TODO(), find)
	if err !=nil{
		return false,err 
	}
	if count != 0 { //this is when the user is allready in the likes list on that comment

		change := bson.M{"$pull": bson.M{"likes": commentInfo.UserId}}
		filter := bson.M{"_id": doc_comment_ID}
		_, err := collection.UpdateOne(ctx, filter, change)
		if err != nil {
			return false , err
		}
		// c.JSON(http.StatusOK, result)
		fmt.Println("the user already liked so disliked")

	} else { //the user didn't have liked it before
		change := bson.M{"$push": bson.M{"likes": commentInfo.UserId}}
		filter := bson.M{"_id": doc_comment_ID}
		_, err := collection.UpdateOne(ctx, filter, change)
		if err != nil {
			return false , err
		}
		fmt.Println("the like added")
	}
	return true , nil
}
func (repo *CommentRepo)RemoveComment(ctx context.Context)(bool , error){
	commentId :=ctx.Value("comment_id").(string)
	prCommentId , err := primitive.ObjectIDFromHex(commentId)
	if err !=nil{
		return false , err
	}
	filter:= bson.M{"_id":prCommentId}
	collection:=repo.Conn.Collection("comment")
	_, err=collection.DeleteOne(context.TODO(), filter)
	if err !=nil{
		return false , err
	}
	return true , nil
}

func (repo *CommentRepo)LoadComment(ctx context.Context)(*model.Comment,error){
	commentId:=ctx.Value("comment_id").(string)
	comment:= &model.Comment{}
	prCommentId , err := primitive.ObjectIDFromHex(commentId)
	if err !=nil{
		return nil , err
	}
	collection:=repo.Conn.Collection("comment")
	filter:=bson.M{"_id":prCommentId}
	err=collection.FindOne(ctx,filter).Decode(&comment)
	if err!=nil{
		return nil , err
	}
	return comment, nil
}