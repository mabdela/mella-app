package user

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

// IUserRepo interface represernts the methods that a user repo struct shoulkd implements
// User Service instance uses this Interface.
type IUserRepo interface {
	// UserByEmail is a method to get an user instance using the email in the context.
	UserByEmail(ctx context.Context) (*model.User, error)
	ChangePassword(ctx context.Context) bool
	DeleteAccountByEmail(context.Context) error
	CreateUser(ctx context.Context) (*model.User, error)
	UserByID(ctx context.Context) (*model.User, error)
	UpdateUser(ctx context.Context) (*model.User, error)
	// GetImageUrl  uses session in the context of the application to retrieve the user informationa
	GetImageUrl(ctx context.Context) (string, error)
	// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
	ChangeImageUrl(ctx context.Context) error
	// DeleteProfilePicture(ctx context.Context) error  uses the session in the context to get the user ID and profile
	// and delete the profile picture.
	DeleteProfilePicture(ctx context.Context) error
	//to list all users
	AllUsers(ctx context.Context) ([]*model.User, error)
	
	//to get user by Id
	GetUsersById(ctx context.Context) (*model.User, error) //---------
	//to get user by email
	GetUsersByEmail(ctx context.Context) (*model.User, error) //--------
	//to delete user by Id
	DeleteUserById(ctx context.Context) (bool, error) //-----------
	//to delete user by email
	DeleteUserByEmail(ctx context.Context) (bool, error) //--------
}
