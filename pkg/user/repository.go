package user

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IUserRepo interface {
	// AdminByEmail is a method to get an admin instance using the email in the context.
	UserByEmail(ctx context.Context) (*model.User, error)
	ChangePassword(ctx context.Context) bool
	DeleteAccountByEmail(context.Context) error
	// CreateAdmin(ctx context.Context) (*model.User, error)
	UserByID(ctx context.Context) (*model.User, error)
	UpdateUser(ctx context.Context) (*model.User, error)
	// GetImageUrl  uses session in the context of the application to retrieve the user informationa
	GetImageUrl(ctx context.Context) (string, error)
	// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
	ChangeImageUrl(ctx context.Context) error
	// DeleteProfilePicture(ctx context.Context) error  uses the session in the context to get the user ID and profile
	// and delete the profile picture.
	DeleteProfilePicture(ctx context.Context) error
}
