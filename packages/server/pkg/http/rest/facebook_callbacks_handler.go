package rest

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/platforms/helper"
	"github.com/mabdela/mella-backend/platforms/mail"
)

// FacebookAdminLogin ...
func (adminhr *AdminHandler) FacebookAdminLoginCallBack(writer http.ResponseWriter, request *http.Request, user *model.FacebookUser) {
	writer.Header().Set("Content-Type", "application/json")
	// LoginResponse ...
	resp := &model.LoginResponse{}

	log.Println(string(helper.MarshalThis(request.Header)))

	// Here i have all the users information there for i have to enable the user with out the requirement of password.

	ctx := request.Context()
	var (
		newUser *model.Admin
		err     error
	)
	if helper.MatchesPattern(user.Email, helper.EmailRX) {
		ctx = context.WithValue(ctx, "email", user.Email)
		newUser, err = adminhr.AdminSer.AdminByEmail(ctx)
	} else {
		resp.Success = false
		resp.Message = " this account doesn't contain an email ,admins can't login with out an email address "
		writer.WriteHeader(401)
		writer.Write(helper.MarshalThis(resp))
		return
	}
	if err != nil || newUser == nil {
		resp.Success = false
		resp.Message = "invalid account "
		writer.WriteHeader(401)
		writer.Write(helper.MarshalThis(resp))
		return
	} else {
		session := &model.Session{
			ID:       newUser.ID,
			Email:    newUser.Email,
			Password: newUser.Password,
		}
		if newUser.Superadmin {
			session.Role = state.SUPERADMIN
		} else {
			session.Role = state.ADMIN
		}
		success := adminhr.Authenticator.SaveSession(writer, session)
		if !success {
			resp.Message = os.Getenv("INTERNAL_SERVER_ERROR")
			resp.Success = false
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write(helper.MarshalThis(resp))
			return
		}
		resp.Success = true
		resp.Message = state.SuccesfulyLoggedIn
		resp.User = newUser
		writer.WriteHeader(http.StatusOK)
		writer.Write(helper.MarshalThis(resp))
		return
	}
}

func (userhandler *UserHandler) FacebookUserSignupCallBack(writer http.ResponseWriter, request *http.Request, guser *model.FacebookUser) {
	writer.Header().Set("Content-Type", "application/json")
	resp := &model.CreateUser{
		false,
		"Bad Request Body",
	}
	fail := false
	// since the user may not have an email we will not be checking
	// whether the email is valid or not.
	if len(strings.Trim(guser.Firstname, " ")) <= 2 {
		guser.Firstname = guser.Email[0:7]
	}
	if len(strings.Trim(guser.Lastname, " ")) <= 2 {
		guser.Lastname = "unknown"
	}
	if !fail {
		// Generate Random password
		password := helper.GenerateRandomString(5, helper.NUMBERS)
		hash, er := helper.HashPassword(password)
		ctx := request.Context()
		var (
			user *model.User
			err  error
		)
		if helper.MatchesPattern(guser.Email, helper.EmailRX) {
			ctx = context.WithValue(ctx, "email", guser.Email)
			user, err = userhandler.Service.UserByEmail(ctx)
		} else {
			ctx = context.WithValue(ctx, "user_id", guser.ID)
			user, err = userhandler.Service.UserByID(ctx)
		}
		if user != nil || err == nil {
			resp.Message = "account with facebook account is already registered"
			writer.WriteHeader(http.StatusUnauthorized)
			writer.Write(helper.MarshalThis(resp)) //it should respond statusForbiden (check)
			return
		}
		if er != nil {
			resp.Message = " Internal Server error "
			resp.Success = false
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write(helper.MarshalThis(resp))
			return
		}
		user = &model.User{
			ID:        guser.ID,
			Firstname: guser.Firstname,
			Lastname:  guser.Lastname,
			Email:     guser.Email, //
			Password:  hash,
		}
		// Send Email for the password if this doesn't work raise internal server error.
		if success := mail.SendPasswordEmailSMTP([]string{user.Email}, password, true, user.Firstname+" "+user.Lastname, request.Host); success {
			ctx = request.Context()
			if guser.Picture != "" {
				imageName, er := helper.DownloadResource(guser.Picture, os.Getenv("ASSETS_DIRECTORY")+state.PROFILE_IMAGES_RELATIVE_PATH, "jpg")
				if er == nil && imageName != "" {
					// mnm madreg ayichalm
					user.Imgurl = state.PROFILE_IMAGES_RELATIVE_PATH + imageName
				}
			}
			ctx = context.WithValue(ctx, "user", user)
			if user, er = userhandler.Service.CreateUser(ctx); user != nil && er == nil {
				// Save the Profile Picture and
				resp.Success = true
				resp.Message = func() string {
					return " user "
				}() + " created succesfully!"
				writer.WriteHeader(http.StatusOK)
				writer.Write(helper.MarshalThis(resp))
				return
			} else {
				if user != nil && er != nil {
					resp.Message = er.Error()
				} else {
					resp.Message = "Internal server error!"
				}
				writer.WriteHeader(http.StatusInternalServerError)
				writer.Write(helper.MarshalThis(resp))
				return
			}
		} else {
			resp.Message = "Internal server error!"
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write(helper.MarshalThis(resp))
			return
		}
	}
	// }
	writer.WriteHeader(http.StatusBadRequest)
	writer.Write(helper.MarshalThis(resp))
}

// FacebookUserLogin ...
func (userhandler *UserHandler) FacebookUserSigninCallBack(writer http.ResponseWriter, request *http.Request, user *model.FacebookUser) {
	writer.Header().Set("Content-Type", "application/json")
	resp := &model.LoginResponse{}
	resp.Success = false
	ctx := request.Context()
	var newUser *model.User
	var err error
	if helper.MatchesPattern(user.Email, helper.EmailRX) {
		ctx = context.WithValue(ctx, "email", user.Email)
		newUser, err = userhandler.Service.UserByEmail(ctx)
	} else {
		// Find the user with ID .... using the ID coming from facebook.
		ctx = context.WithValue(ctx, "user_id", user.ID)
		newUser, err = userhandler.Service.UserByID(ctx)
	}
	if err != nil || newUser == nil {
		resp.Success = false
		resp.Message = "invalid account "
		writer.WriteHeader(401)
		writer.Write(helper.MarshalThis(resp))
		return
	} else {
		session := &model.Session{
			ID:       newUser.ID,
			Email:    newUser.Email,
			Password: newUser.Password,
			Role:     state.USER,
		}
		success := userhandler.Authenticator.SaveSession(writer, session)
		if !success {
			resp.Message = os.Getenv("INTERNAL_SERVER_ERROR")
			resp.Success = false
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write(helper.MarshalThis(resp))
			return
		}
		resp.Success = true
		resp.Message = state.SuccesfulyLoggedIn
		resp.User = newUser
		writer.WriteHeader(http.StatusOK)
		writer.Write(helper.MarshalThis(resp))
		return
	}
}
