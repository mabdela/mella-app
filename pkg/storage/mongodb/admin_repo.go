package mongodb

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/admin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
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
	return false
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
	return nil, nil
}
