package user

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type IUserService interface {
	// AdminByEmail uses "email" string
	UserByEmail(ctx context.Context) (*model.User, error)
	// ChangePassword uses "password" string and "admin_id" string to change a users password
	ChangePassword(ctx context.Context) bool
	DeleteAccountByEmail(context.Context) bool
	// CreateAdmin(context.Context) (*model.Admin, error)
	// AdminByID uses ""
	UserByID(ctx context.Context) (*model.User, error)
	// UpdateAdmin uses "admin" *model.Admin
	UpdateUser(ctx context.Context) (*model.User, error)
	// GetImageUrl  uses the session (*model.Session) in the context of the application to retrieve the user informationa
	GetImageUrl(ctx context.Context) string
	// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
	ChangeImageUrl(ctx context.Context) bool
	// DeleteProfilePicture uses the session to delete the imgurl
	DeleteProfilePicture(ctx context.Context) bool
}

// AdminService struct representing a admin service
type UserService struct {
	Repo IUserRepo
}

func NewUserService(repo IUserRepo) IUserService {
	return &UserService{
		Repo: repo,
	}
}
func (userser *UserService) UserByEmail(ctx context.Context)(*model.User,error){
	//to be implemented 
	return userser.Repo.UserByEmail(ctx)
}
// ChangePassword (ctx context.Context) (bool, error)
func (userser *UserService) ChangePassword(ctx context.Context) bool {
	return userser.Repo.ChangePassword(ctx)
}
func (userser *UserService) DeleteAccountByEmail(ctx context.Context) bool {
	return userser.Repo.DeleteAccountByEmail(ctx) == nil
}

func (userser *UserService) AdminByID(ctx context.Context) (*model.User, error) {
	return userser.Repo.UserByID(ctx)
}
func (userser *UserService) UpdateAdmin(ctx context.Context) (*model.User, error) {
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
func (userser *UserService) UpdateUser(ctx context.Context) (*model.User, error) {
	return userser.Repo.UpdateUser(ctx)
}
func (userser *UserService) UserByID(ctx context.Context) (*model.User, error) {
	return userser.Repo.UserByID(ctx)
}