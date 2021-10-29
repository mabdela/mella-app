package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type (
	Admin struct {
		ID         string `json:"id"  bson:"_id"`
		Email      string `json:"email"`
		Firstname  string `json:"first_name"`
		Lastname   string `json:"last_name"`
		Imgurl     string `json:"imgurl"`
		Password   string `json:"password"`
		Superadmin bool   `json:"superadmin"`
	}

	AdminInsert struct {
		ID         primitive.ObjectID `bson:"_id,omitempty"`
		Email      string             `bson:"email"`
		Firstname  string             `bson:"first_name"`
		Lastname   string             `bson:"last_name"`
		Imgurl     string             `bson:"imgurl"`
		Password   string             `bson:"password"`
		Superadmin bool               `bson:"superadmin"`
	}
)

func (admin *Admin) GetInsertAdmin() *AdminInsert {
	oid, er := primitive.ObjectIDFromHex(admin.ID)
	if er != nil {
	}
	return &AdminInsert{
		ID:         oid,
		Email:      admin.Email,
		Password:   admin.Password,
		Firstname:  admin.Firstname,
		Lastname:   admin.Lastname,
		Imgurl:     admin.Imgurl, //
		Superadmin: admin.Superadmin,
	}
}
