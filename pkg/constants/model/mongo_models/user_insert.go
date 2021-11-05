package mongo_models

import (
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MUser struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Email     string             `bson:"email"`
	Firstname string             `bson:"first_name"`
	Lastname  string             `bson:"last_name"`
	Imgurl    string             `bson:"imgurl"`
	Password  string             `bson:"password"`
}

func GetMUser(user *model.User) *MUser {
	oid, _ := primitive.ObjectIDFromHex(user.ID)

	return &MUser{
		ID:        oid,
		Email:     user.Email,
		Password:  user.Password,
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		Imgurl:    user.Imgurl, //
	}
}

func (muser *MUser) GetUser() *model.User {
	ids := helper.ObjectIDStringFromObjectID(muser.ID)
	return &model.User{
		ID:        ids,
		Email:     muser.Email,
		Password:  muser.Password,
		Firstname: muser.Firstname,
		Lastname:  muser.Lastname,
		Imgurl:    muser.Imgurl, //
	}
}
