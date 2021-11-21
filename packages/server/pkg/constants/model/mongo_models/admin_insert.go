/*
In this Package we will be storing list of mdoels that are only to be used by the
mongo repo only
*/
package mongo_models

import (
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MAdmin struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	Email      string             `bson:"email"`
	Firstname  string             `bson:"first_name"`
	Lastname   string             `bson:"last_name"`
	Imgurl     string             `bson:"imgurl"`
	Password   string             `bson:"password"`
	Superadmin bool               `bson:"superadmin"`
}

func GetMAdmin(admin *model.Admin) *MAdmin {
	oid, _ := primitive.ObjectIDFromHex(admin.ID)

	return &MAdmin{
		ID:         oid,
		Email:      admin.Email,
		Password:   admin.Password,
		Firstname:  admin.Firstname,
		Lastname:   admin.Lastname,
		Imgurl:     admin.Imgurl, //
		Superadmin: admin.Superadmin,
	}
}

func (madmin *MAdmin) GetAdmin() *model.Admin {
	ids := helper.ObjectIDStringFromObjectID(madmin.ID)
	return &model.Admin{
		ID:         ids,
		Email:      madmin.Email,
		Password:   madmin.Password,
		Firstname:  madmin.Firstname,
		Lastname:   madmin.Lastname,
		Imgurl:     madmin.Imgurl, //
		Superadmin: madmin.Superadmin,
	}
}
