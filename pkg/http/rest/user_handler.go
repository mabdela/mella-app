package rest

import (
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
	"github.com/mabdela/mella-backend/pkg/user"
	"github.com/mabdela/mella-backend/platforms/hash"
)

type IUserHandler interface {
	UserLogin(c *gin.Context)
	ChangePassword(c *gin.Context)
	ForgotPassword(c *gin.Context)
	// DeactivateAccount(c *gin.Context)
	DeleteProfilePicture(c *gin.Context)
	ChangeProfilePicture(c *gin.Context)
	// CreateAdmin(c *gin.Context)
	Logout(c *gin.Context)
	UpdateUser(c *gin.Context)
}

// AdminHandler ... |  ...
type UserHandler struct {
	Authenticator auth.Authenticator
	UserSer       user.IUserService
}

func NewUserHandler(auths auth.Authenticator, userser user.IUserService) IUserHandler {
	return &UserHandler{
		UserSer:       userser,
		Authenticator: auths,
	}
}

func (userhr *UserHandler) UserLogin(c *gin.Context) {
	input := &struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}{}
	// LoginResponse ...
	resp := &model.LoginResponse{}
	resp.Success = false
	err := c.Bind(input)
	if err != nil || input.Email == "" || input.Password == "" {
		resp.Message = os.Getenv("INVALID_INPUT")
		c.JSON(http.StatusUnauthorized, resp)
		return
	}
	ctx := c.Request.Context()
	ctx = context.WithValue(ctx, "email", input.Email)
	newUser, err := userhr.UserSer.UserByEmail(ctx)
	if err != nil || newUser == nil {
		resp.Success = false
		resp.Message = "Invalid Username or Password!"
		c.JSON(401, resp)
		return
	} else {
		if newUser == nil {
			goto InvalidUsernameOrPassword
		}
		// comparing the hashed password and the password
		matches := hash.ComparePassword(newUser.Password, input.Password)
		if !matches {
			goto InvalidUsernameOrPassword
		}
		session := &model.Session{
			ID:       newUser.ID,
			Email:    newUser.Email,
			Password: input.Password,
		}
		// if newUser.Superadmin {
		// 	session.Role = state.SUPERADMIN
		// } else {
		// 	session.Role = state.ADMIN
		// }
		success := userhr.Authenticator.SaveSession(c.Writer, session)
		if !success {
			resp.Message = os.Getenv("INTERNAL_SERVER_ERROR")
			resp.Success = false
			c.JSON(http.StatusInternalServerError, resp)
			return
		}
		resp.Success = true
		resp.Message = state.SuccesfulyLoggedIn
		resp.User = newUser
		c.JSON(200, resp)
		return
	}
InvalidUsernameOrPassword:
	{
		resp.Success = false
		resp.Message = state.InvalidUsernameORPassword
		c.JSON(401, resp)
		return
	}
}

func (userhr *UserHandler) ChangePassword(c *gin.Context) {

}
func (userhr *UserHandler) ForgotPassword(c *gin.Context) {

}
func (userhr *UserHandler) DeleteProfilePicture(c *gin.Context) {

}
func (userhr *UserHandler) ChangeProfilePicture(c *gin.Context) {

}
func (userhr *UserHandler) Logout(c *gin.Context) {

}
func (userhr *UserHandler) UpdateUser(c *gin.Context) {

}
