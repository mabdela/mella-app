package admin

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

// Interfaces to be implemented by the admin service instances
type IAdminService interface {
	// AdminByEmail uses "email" string
	AdminByEmail(ctx context.Context) (*model.Admin, error)
	// ChangePassword uses "password" string and "admin_id" string to change a users password
	ChangePassword(ctx context.Context) bool
	// DeleteAccountByEmail uses "email" string to delete an admin
	DeleteAccountByEmail(context.Context) bool
	// CreateAdmin uses "admin" *model.Admin to create a new Admin instance.
	CreateAdmin(context.Context) (*model.Admin, error)
	// AdminByID uses "admin_id" stringto return an admin instance.
	AdminByID(ctx context.Context) (*model.Admin, error)
	// UpdateAdmin uses "admin" *model.Admin
	UpdateAdmin(ctx context.Context) (*model.Admin, error)
	// GetImageUrl  uses the session (*model.Session) in the context of the application to retrieve the user informationa
	GetImageUrl(ctx context.Context) string
	// ChangeImageUrl uses 'image_url' and 'user_id' to modify the user's profile Picture.
	ChangeImageUrl(ctx context.Context) bool
	// DeleteProfilePicture uses the session to delete the imgurl
	DeleteProfilePicture(ctx context.Context) bool
}

// AdminService struct representing a admin service
type AdminService struct {
	Repo IAdminRepo
}

// NewAdminService function returninng an admin service  instance
func NewAdminService(repo IAdminRepo) IAdminService {
	return &AdminService{
		Repo: repo,
	}
}

func (adminser *AdminService) AdminByEmail(ctx context.Context) (*model.Admin, error) {
	return adminser.Repo.AdminByEmail(ctx)
}

// ChangePassword (ctx context.Context) (bool, error)
func (adminser *AdminService) ChangePassword(ctx context.Context) bool {
	return adminser.Repo.ChangePassword(ctx)
}

func (adminser *AdminService) DeleteAccountByEmail(ctx context.Context) bool {
	return adminser.Repo.DeleteAccountByEmail(ctx) == nil
}

// CreateAdmin(context.Context) (*model.Admin, error)
func (adminser *AdminService) CreateAdmin(ctx context.Context) (*model.Admin, error) {
	return adminser.Repo.CreateAdmin(ctx)
}

func (adminser *AdminService) AdminByID(ctx context.Context) (*model.Admin, error) {
	return adminser.Repo.AdminByID(ctx)
}
func (adminser *AdminService) UpdateAdmin(ctx context.Context) (*model.Admin, error) {
	return adminser.Repo.UpdateAdmin(ctx)
}

func (adminser *AdminService) GetImageUrl(ctx context.Context) string {
	img, er := adminser.Repo.GetImageUrl(ctx)
	if er != nil {
		return ""
	}
	return img
}
func (adminser *AdminService) ChangeImageUrl(ctx context.Context) bool {
	return adminser.Repo.ChangeImageUrl(ctx) == nil
}

// DeleteProfilePicture(ctx context.Context) error
func (adminser *AdminService) DeleteProfilePicture(ctx context.Context) bool {
	return adminser.Repo.DeleteProfilePicture(ctx) == nil
}
