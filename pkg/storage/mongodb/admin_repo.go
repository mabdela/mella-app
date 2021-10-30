package mongodb

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/admin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func (repo *AdminRepo) DeleteAccountByEmail(context.Context) error { return nil }
func (repo *AdminRepo) CreateAdmin(ctx context.Context) (*model.Admin, error) {
	// admin :=

	return nil, nil
}
func (repo *AdminRepo) AdminByID(ctx context.Context) (*model.Admin, error) {
	return nil, nil
}
func (repo *AdminRepo) UpdateAdmin(ctx context.Context) (*model.Admin, error) {
	return nil, nil
}

// GetImageUrl  uses session in the context of the application to retrieve the user informationa
func (repo *AdminRepo) GetImageUrl(ctx context.Context) (string, error) {
	return "", nil
}

// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
func (repo *AdminRepo) ChangeImageUrl(ctx context.Context) error {
	return nil
}

// DeleteProfilePicture(ctx context.Context) error  uses the session in the context to get the user ID and profile
// and delete the profile picture.
func (repo *AdminRepo) DeleteProfilePicture(ctx context.Context) error {
	return nil
}

// AdminByEmail is a method to get an admin instance using the email in the context.
func (repo *AdminRepo) AdminByEmail(ctx context.Context) (*model.Admin, error) {
	email := ctx.Value("email").(string)
	println(email)
	filter := bson.D{{"email", email}}
	adminInput := &mongo_models.MAdmin{}
	if erro := repo.Conn.Collection(state.ADMINS).FindOne(ctx, filter).Decode(adminInput); erro == nil {
		admin := adminInput.GetAdmin()
		return admin, erro
	} else {
		return nil, erro
	}
}
