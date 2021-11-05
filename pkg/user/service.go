package user

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IUserService interface {
	// UserByEmail uses "email" string
	UserByEmail(ctx context.Context) (*model.User, error)
	// ChangePassword uses "password" string and "user_id" string to change a users password
	ChangePassword(ctx context.Context) bool
	// DeleteAccountByEmail uses "email" string to delete an user.
	DeleteAccountByEmail(context.Context) bool
	// CreateUser uses "user" *model.User to create a new Admin instance.
	CreateUser(context.Context) (*model.User, error)
	// UserByID uses "user_id" stringto return an admin instance.
	UserByID(ctx context.Context) (*model.User, error)
	// UpdateUser uses "user" *model.User
	UpdateUser(ctx context.Context) (*model.User, error)
	// GetImageUrl  uses the session (*model.Session) in the context of the application to retrieve the user informationa
	GetImageUrl(ctx context.Context) string
	// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
	ChangeImageUrl(ctx context.Context) bool
	// DeleteProfilePicture uses the "session" *model.Session to delete the imgurl.
	// This session instance is instantiated at the time of authentication.
	// thre for you don't have to intialize it at the handler function.
	DeleteProfilePicture(ctx context.Context) bool
}

type UserService struct {
	Repo IUserRepo
}

func NewUserService(repo IUserRepo) IUserService {
	return &UserService{repo}
}

func (userser *UserService) UserByEmail(ctx context.Context) (*model.User, error) {
	return userser.Repo.UserByEmail(ctx)
}

// ChangePassword (ctx context.Context) (bool, error)
func (userser *UserService) ChangePassword(ctx context.Context) bool {
	return userser.Repo.ChangePassword(ctx)
}
func (userser *UserService) DeleteAccountByEmail(ctx context.Context) bool {
	return userser.Repo.DeleteAccountByEmail(ctx) == nil
}

// CreateUser(context.Context) (*model.User, error)
func (userser *UserService) CreateUser(ctx context.Context) (*model.User, error) {
	return userser.Repo.CreateUser(ctx)
}

func (userser *UserService) UserByID(ctx context.Context) (*model.User, error) {
	return userser.Repo.UserByID(ctx)
}
func (userser *UserService) UpdateUser(ctx context.Context) (*model.User, error) {
	return userser.Repo.UpdateUser(ctx)
}
func (userser *UserService) GetImageUrl(ctx context.Context) string {
	img, er := userser.Repo.GetImageUrl(ctx)
	if er != nil {
		return ""
	}
	return img
}
func (userser *UserService) ChangeImageUrl(ctx context.Context) bool {
	return userser.Repo.ChangeImageUrl(ctx) == nil
}
// DeleteProfilePicture(ctx context.Context) error
func (userser *UserService) DeleteProfilePicture(ctx context.Context) bool {
	return userser.Repo.DeleteProfilePicture(ctx) == nil
}
