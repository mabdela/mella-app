package mongodb

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/pkg/user"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// UserRepo a repository instance for users.
type UserRepo struct {
	Conn *mongo.Database
}

func NewUserRepo(conn *mongo.Database) user.IUserRepo {
	return &UserRepo{Conn: conn}
}

func (repo *UserRepo) ChangePassword(ctx context.Context) bool {
	password := ctx.Value("password").(string)
	userID := ctx.Value("user_id").(string)
	useroid, era := primitive.ObjectIDFromHex(userID)
	if era != nil {
		return false
	}
	filter := bson.D{{"_id", useroid}}
	set := bson.D{{"$set", bson.D{{"password", password}}}}
	if _, ero := repo.Conn.Collection(state.USERS).UpdateOne(ctx, filter, set); ero != nil {
		return false
	}
	return true
}

func (repo *UserRepo) DeleteAccountByEmail(ctx context.Context) error {
	email := ctx.Value("email").(string)
	filter := bson.D{{"email", email}}
	if dc, er := repo.Conn.Collection(state.USERS).DeleteOne(ctx, filter); dc.DeletedCount == 0 || er != nil {
		return errors.New("no record was deleted!")
	}
	return nil
}
func (repo *UserRepo) CreateUser(ctx context.Context) (*model.User, error) {
	user := ctx.Value("user").(*model.User)
	userInsert := mongo_models.GetMUser(user)
	if insert, er := repo.Conn.Collection(state.USERS).InsertOne(context.TODO(), userInsert); insert.InsertedID != nil && er == nil {
		oidstring := helper.ObjectIDFromInsertResult(insert)
		if oidstring == "" {
			return user, errors.New("invalid insert ID ")
		}
		user.ID = oidstring
		return user, nil
	} else {
		return nil, er
	}
}
func (repo *UserRepo) UserByID(ctx context.Context) (*model.User, error) {
	userid := ctx.Value("user_id").(string)
	oid, er := primitive.ObjectIDFromHex(userid)
	if er != nil {
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	userIns := &mongo_models.MUser{}
	if er = repo.Conn.Collection(state.USERS).FindOne(ctx, filter).Decode(userIns); er == nil {
		user := userIns.GetUser()
		return user, er
	} else {
		return nil, er
	}
}
func (repo *UserRepo) UpdateUser(ctx context.Context) (*model.User, error) {
	user := ctx.Value("user").(*model.User)
	oid, er := primitive.ObjectIDFromHex(user.ID)
	if er != nil {
		return nil, er //
	}
	filter := bson.D{{"_id", oid}}
	update := bson.D{{"$set", bson.D{
		{"email", user.Email},
		{"first_name", user.Firstname},
		{"last_name", user.Lastname},
		{"imgurl", user.Imgurl},
		{"password", user.Password},
	}}}
	if uc, er := repo.Conn.Collection(state.USERS).UpdateOne(ctx, filter, update); uc.ModifiedCount > 0 && er == nil {
		return user, er
	}
	return nil, errors.New("user update was not succesful!")
}

// GetImageUrl  uses session in the context of the application to retrieve the user informationa
func (repo *UserRepo) GetImageUrl(ctx context.Context) (string, error) {
	session := ctx.Value("session").(*model.Session)
	if oid, er := primitive.ObjectIDFromHex(session.ID); er == nil {
		filter := bson.D{{"_id", oid}}
		findOneOption := options.FindOne().SetProjection(bson.D{{"imgurl", 1}})
		user := &mongo_models.MUser{}
		if er := repo.Conn.Collection(state.USERS).FindOne(ctx, filter, findOneOption).Decode((user)); er != nil {
			log.Println(er.Error())
			return user.Imgurl, er
		}
		return user.Imgurl, nil
	} else {
		return "", er
	}
}

// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
func (repo *UserRepo) ChangeImageUrl(ctx context.Context) error {
	imgurl := ctx.Value("image_url").(string)
	userID := ctx.Value("user_id").(string)

	oid, er := primitive.ObjectIDFromHex(userID)
	if er != nil {
		return er
	}
	filter := bson.D{{"_id", oid}}
	update := bson.D{{"$set", bson.D{{"imgurl", imgurl}}}}
	if ur, era := repo.Conn.Collection(state.USERS).UpdateOne(ctx, filter, update); ur.ModifiedCount == 0 || era != nil {
		if era != nil {
			return era
		}
		return errors.New("no result was updated")
	}
	return nil
}

// DeleteProfilePicture(ctx context.Context) error  uses the session in the context to get the user ID and profile
// and delete the profile picture.
func (repo *UserRepo) DeleteProfilePicture(ctx context.Context) error {
	session := ctx.Value("session").(*model.Session)
	if oid, era := primitive.ObjectIDFromHex(session.ID); era == nil {
		filter := bson.D{{"_id", oid}}
		update := bson.D{{"$set", bson.D{{"imgurl", ""}}}}
		if ur, era := repo.Conn.Collection(state.USERS).UpdateOne(ctx, filter, update); ur.ModifiedCount == 0 || era != nil {
			if era != nil {
				return era
			}
			return errors.New("no result was updated")
		}
		// Update was succesful.
		return nil
	} else {
		return era
	}
}

// userByEmail is a method to get an user instance using the email in the context.
func (repo *UserRepo) UserByEmail(ctx context.Context) (*model.User, error) {
	email := ctx.Value("email").(string)
	filter := bson.D{{"email", email}}
	userInput := &mongo_models.MUser{}
	// var userInput mongo_models.MUser
	if erro := repo.Conn.Collection(state.USERS).FindOne(ctx, filter).Decode(userInput); erro == nil {
		user := userInput.GetUser()
		return user, erro
	} else {
		return nil, erro
	}
}
func (repo *UserRepo) AllUsers(ctx context.Context) ([]*model.User, error) {
	
	fmt.Println("inside all users repo")
	
	userList := []*model.User{}
	collection := repo.Conn.Collection(state.USERS)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		mUser := &mongo_models.MUser{}
		err = cursor.Decode(mUser)
		if err != nil {
			return nil, err
		}
		user := mUser.GetUser()
		userList = append(userList, user)
	}
	fmt.Println("userList ", userList)
	cursor.Close(ctx)
	return userList, nil
}
//new

func (repo *UserRepo) GetUsersById(ctx context.Context) (*model.User, error) {
	user_id := ctx.Value("user_id").(string)
	Muser := &mongo_models.MUser{}
	Puser_id, err := primitive.ObjectIDFromHex(user_id)
	if err != nil {
		return nil, err
	}
	filter := bson.M{"_id": Puser_id}
	collection := repo.Conn.Collection(state.USERS)
	err = collection.FindOne(ctx, filter).Decode(Muser)
	if err != nil {
		return nil, err
	}
	user := Muser.GetUser()
	return user, nil
}
func (repo *UserRepo) GetUsersByEmail(ctx context.Context) (*model.User, error) {
	user_email := ctx.Value("email").(string)
	Muser := &mongo_models.MUser{}
	filter := bson.M{"email": user_email}
	collection := repo.Conn.Collection(state.USERS)
	err := collection.FindOne(ctx, filter).Decode(Muser)
	if err != nil {
		return nil, err
	}
	user := Muser.GetUser()
	fmt.Println(user)
	return user, nil
}
func (repo *UserRepo) DeleteUserById(ctx context.Context) (bool, error) {
	user_id := ctx.Value("user_id").(string)
	Puser_id, err := primitive.ObjectIDFromHex(user_id)
	if err != nil {
		return false, err
	}
	filter := bson.M{"_id": Puser_id}
	collection := repo.Conn.Collection(state.USERS)
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		return false, err
	}
	return true, nil
}
func (repo *UserRepo) DeleteUserByEmail(ctx context.Context) (bool, error) {
	user_email := ctx.Value("email").(string)
	filter := bson.M{"email": user_email}
	collection := repo.Conn.Collection(state.USERS)
	_, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		return false, err
	}
	return true, nil
}
