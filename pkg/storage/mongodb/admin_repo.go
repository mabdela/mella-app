package mongodb

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/mabdela/mella-backend/pkg/admin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/platforms/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type AdminRepo struct {
	Conn *mongo.Database
}

// NewAdminRepo ...
func NewAdminRepo(conn *mongo.Database) admin.IAdminRepo {
	return &AdminRepo{
		Conn: conn,
	}
}

func (repo *AdminRepo) ChangePassword(ctx context.Context) bool {
	password := ctx.Value("password").(string)
	adminID := ctx.Value("admin_id").(string)
	adminoid, era := primitive.ObjectIDFromHex(adminID)
	if era != nil {
		return false
	}
	filter := bson.D{{"_id", adminoid}}
	set := bson.D{{"$set", bson.D{{"password", password}}}}
	if _, ero := repo.Conn.Collection(state.ADMINS).UpdateOne(ctx, filter, set); ero != nil {
		return false
	}
	return true
}

func (repo *AdminRepo) DeleteAccountByEmail(ctx context.Context) error {
	email := ctx.Value("email").(string)
	filter := bson.D{{"email", email}}
	if dc, er := repo.Conn.Collection(state.ADMINS).DeleteOne(ctx, filter); dc.DeletedCount == 0 || er != nil {
		return errors.New("no record was deleted!")
	}
	return nil
}
func (repo *AdminRepo) CreateAdmin(ctx context.Context) (*model.Admin, error) {
	admin := ctx.Value("admin").(*model.Admin)
	adminInsert := mongo_models.GetMAdmin(admin)
	fmt.Println("adminInsert", adminInsert)
	if insert, er := repo.Conn.Collection(state.ADMINS).InsertOne(context.TODO(), adminInsert); insert.InsertedID != nil && er == nil {
		oidstring := helper.ObjectIDFromInsertResult(insert)
		if oidstring == "" {
			return admin, errors.New("invalid insert ID ")
		}
		admin.ID = oidstring
		return admin, nil
	} else {
		return nil, er
	}
}
func (repo *AdminRepo) AdminByID(ctx context.Context) (*model.Admin, error) {
	adminid := ctx.Value("admin_id").(string)
	oid, er := primitive.ObjectIDFromHex(adminid)
	if er != nil {
		return nil, er
	}
	filter := bson.D{{"_id", oid}}
	adminIns := &mongo_models.MAdmin{}
	if er = repo.Conn.Collection(state.ADMINS).FindOne(ctx, filter).Decode(adminIns); er == nil {
		admin := adminIns.GetAdmin()
		return admin, er
	} else {
		return nil, er
	}
}
func (repo *AdminRepo) UpdateAdmin(ctx context.Context) (*model.Admin, error) {
	admin := ctx.Value("admin").(*model.Admin)
	oid, er := primitive.ObjectIDFromHex(admin.ID)
	if er != nil {
		return nil, er //
	}
	filter := bson.D{{"_id", oid}}
	update := bson.D{{"$set", bson.D{
		{"email", admin.Email},
		{"first_name", admin.Firstname},
		{"last_name", admin.Lastname},
		{"imgurl", admin.Imgurl},
		{"password", admin.Password},
		{"superadmin", admin.Superadmin},
	}}}
	if uc, er := repo.Conn.Collection(state.ADMINS).UpdateOne(ctx, filter, update); uc.ModifiedCount > 0 && er == nil {
		return admin, er
	}
	return nil, errors.New("admin update was not succesful!")
}

// GetImageUrl  uses session in the context of the application to retrieve the user informationa
func (repo *AdminRepo) GetImageUrl(ctx context.Context) (string, error) {
	session := ctx.Value("session").(*model.Session)
	if oid, er := primitive.ObjectIDFromHex(session.ID); er == nil {
		filter := bson.D{{"_id", oid}}
		findOneOption := options.FindOne().SetProjection(bson.D{{"imgurl", 1}})
		admin := &mongo_models.MAdmin{}
		if er := repo.Conn.Collection(state.ADMINS).FindOne(ctx, filter, findOneOption).Decode((admin)); er != nil {
			log.Println(er.Error())
			return admin.Imgurl, er
		}
		return admin.Imgurl, nil
	} else {
		return "", er
	}
}

// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
func (repo *AdminRepo) ChangeImageUrl(ctx context.Context) error {
	imgurl := ctx.Value("image_url").(string)
	userID := ctx.Value("user_id").(string)

	oid, er := primitive.ObjectIDFromHex(userID)
	if er != nil {
		return er
	}
	filter := bson.D{{"_id", oid}}
	update := bson.D{{"$set", bson.D{{"imgurl", imgurl}}}}
	if ur, era := repo.Conn.Collection(state.ADMINS).UpdateOne(ctx, filter, update); ur.ModifiedCount == 0 || era != nil {
		if era != nil {
			return era
		}
		return errors.New("no result was updated")
	}
	return nil
}

// DeleteProfilePicture(ctx context.Context) error  uses the session in the context to get the user ID and profile
// and delete the profile picture.
func (repo *AdminRepo) DeleteProfilePicture(ctx context.Context) error {
	session := ctx.Value("session").(*model.Session)
	if oid, era := primitive.ObjectIDFromHex(session.ID); era == nil {
		filter := bson.D{{"_id", oid}}
		update := bson.D{{"$set", bson.D{{"imgurl", ""}}}}
		if ur, era := repo.Conn.Collection(state.ADMINS).UpdateOne(ctx, filter, update); ur.ModifiedCount == 0 || era != nil {
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

// AdminByEmail is a method to get an admin instance using the email in the context.
func (repo *AdminRepo) AdminByEmail(ctx context.Context) (*model.Admin, error) {
	email := ctx.Value("email").(string)
	filter := bson.D{{"email", email}}
	adminInput := &mongo_models.MAdmin{}
	if erro := repo.Conn.Collection(state.ADMINS).FindOne(ctx, filter).Decode(adminInput); erro == nil {
		admin := adminInput.GetAdmin()
		return admin, erro
	} else {
		return nil, erro
	}
}

func (repo *AdminRepo) GetAllAdmins(ctx context.Context) ([]*model.Admin, error) {
	includeSuperadmins := ctx.Value("include_superadmins").(bool)
	admins := []*model.Admin{}
	filter := func() bson.D {
		if includeSuperadmins {
			return bson.D{{"superadmin", true}}
		} else {
			return bson.D{}
		}
	}()
	if cnt, er := repo.Conn.Collection(state.ADMINS).Find(ctx, filter); er != nil || cnt == nil {
		return admins, er
	} else {
		for cnt.Next(ctx) {
			madmin := &mongo_models.MAdmin{}
			if er := cnt.Decode(madmin); er == nil {
				admin := madmin.GetAdmin()
				admins = append(admins, admin)
			}
		}
		return admins, nil
	}
}

func (repo *AdminRepo) DeleteAccountById(ctx context.Context) (bool,error){
	admin_id := ctx.Value("admin_id").(string)
	Padmin_id, err := primitive.ObjectIDFromHex(admin_id)
	if err != nil {
		return false, err
	}
	filter := bson.M{"_id": Padmin_id}
	collection := repo.Conn.Collection(state.ADMINS)
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		return false, err
	}
	return true, nil
}