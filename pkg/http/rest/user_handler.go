package rest

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
	"github.com/mabdela/mella-backend/pkg/user"
	"github.com/mabdela/mella-backend/platforms/form"
	"github.com/mabdela/mella-backend/platforms/hash"
	"github.com/mabdela/mella-backend/platforms/helper"
	"github.com/mabdela/mella-backend/platforms/mail"
)

// IUserHandler interface representing the user handler
// the methods listed in this route has to be implemented by the struct implementing this interface.
type IUserHandler interface {
	UserLogin(c *gin.Context)
	ChangePassword(c *gin.Context)
	ForgotPassword(c *gin.Context)
	DeactivateAccount(c *gin.Context)
	DeleteProfilePicture(c *gin.Context)
	ChangeProfilePicture(c *gin.Context)
	CreateUser(c *gin.Context)
	Logout(c *gin.Context)
	UpdateUser(c *gin.Context)
}

type UserHandler struct {
	Service       user.IUserService
	Authenticator auth.Authenticator
}

// NewUserHandler returns a user handler instance for  the User taking the User service as a Parameter.
func NewUserHandler(authenticator auth.Authenticator, ser user.IUserService) IUserHandler {
	return &UserHandler{
		Service: ser,
	}
}

// UserLogin ...
func (userhandler *UserHandler) UserLogin(c *gin.Context) {
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
	newuser, err := userhandler.Service.UserByEmail(ctx)
	if err != nil || newuser == nil {
		resp.Success = false
		resp.Message = "Invalid Username or Password!"
		c.JSON(401, resp)
		return
	} else {
		if newuser == nil {
			goto InvalidUsernameOrPassword
		}
		matches := hash.ComparePassword(newuser.Password, input.Password)
		if !matches {
			goto InvalidUsernameOrPassword
		}
		session := &model.Session{
			ID:       newuser.ID,
			Email:    newuser.Email,
			Password: input.Password,
		}
		session.Role = state.USER
		success := userhandler.Authenticator.SaveSession(c.Writer, session)
		if !success {
			resp.Message = os.Getenv("INTERNAL_SERVER_ERROR")
			resp.Success = false
			c.JSON(http.StatusInternalServerError, resp)
			return
		}
		resp.Success = true
		resp.Message = state.SuccesfulyLoggedIn
		resp.User = newuser
		c.JSON(200, resp)
		return
	}
	// InvalidUsernameOrPassword
InvalidUsernameOrPassword:
	{
		resp.Success = false
		resp.Message = state.InvalidUsernameORPassword
		c.JSON(401, resp)
		return
	}
}

// Logout || method GET /for an user to log out
func (userhandler *UserHandler) Logout(c *gin.Context) {
	userhandler.Authenticator.DeleteSession(c.Writer, c.Request)
}

// ChangePassword ... method to change the password for all the three roles
// METHOD  : PUT
// INPUT : JSON
/*
	{
		"old_password" : "theoldpassword" ,
		"new_password" : "new_password " ,
		"confirm_password" : "new_password_here"
	}

	OUTPUT : JSON

	{
		"success" : true ,
		"message" : "Password changed succesfuly "
	}
*/
func (userhandler *UserHandler) ChangePassword(c *gin.Context) {
	ctx := c.Request.Context()
	session := ctx.Value("session").(*model.Session)

	res := &model.SimpleSuccessNotifier{
		Success: false,
	}
	input := &struct {
		Oldpassword     string `json:"old_password"`
		NewPassword     string `json:"new_password"`
		ConfirmPassword string `json:"confirm_password"`
	}{}
	jdecoder := json.NewDecoder(c.Request.Body)
	era := jdecoder.Decode(input)
	if era != nil || input.Oldpassword == "" || input.NewPassword == "" || input.ConfirmPassword == "" {
		res.Message = os.Getenv("BAD_REQUEST_BODY")
		c.JSON(http.StatusBadRequest, res)
		return
	}
	if input.ConfirmPassword != input.NewPassword {
		res.Message = os.Getenv("RE_CONFIRM_PASSWORD")
		c.JSON(http.StatusBadRequest, res)
		return
	}
	if len(input.NewPassword) < 4 {
		res.Message = "Password Length Must exceed 4 characters! "
		c.JSON(http.StatusBadRequest, res)
		return
	}
	var changesuccess bool
	ctx = context.WithValue(ctx, "user_id", session.ID)
	hashed, era := hash.HashPassword(input.NewPassword)
	if era != nil {
		res.Message = os.Getenv("INTERNAL_SERVER_ERROR")
		res.Success = false
		c.JSON(http.StatusInternalServerError, res)
		return
	}
	ctx = context.WithValue(ctx, "password", hashed)
	changesuccess = userhandler.Service.ChangePassword(ctx)
	if !changesuccess {
		res.Message = os.Getenv("INTERNAL_SERVER_ERROR")
		res.Success = false
		c.JSON(http.StatusInternalServerError, res)
		return
	}
	res.Message = "Password Changed Succesfuly!"
	res.Success = true
	c.JSON(http.StatusOK, res)
}

/* ForgotPassword method GET
Input
{
	"email" : "usersemail@gmail.com"
}
*/
func (userhandler *UserHandler) ForgotPassword(c *gin.Context) {
	input := &struct {
		Email string `json:"email"`
	}{}

	respo := &struct {
		Message string `json:"msg"`
	}{}
	if input.Email = c.Request.FormValue("email"); input.Email == "" {
		respo.Message = "Expected Email not found!"
		c.JSON(http.StatusBadRequest, respo)
		return
	}
	// session, _ := userhandler.Authenticator.GetSession(request)
	ctx := c.Request.Context()
	if !form.MatchesPattern(input.Email, form.EmailRX) {
		respo.Message = "Invalid email address!"
		c.JSON(http.StatusBadRequest, respo)
		return
	}
	ctx = context.WithValue(ctx, "email", input.Email)
	log.Println("The Email is ", input.Email)
	user, er := userhandler.Service.UserByEmail(ctx)
	if user != nil && er == nil {
		password := helper.GenerateRandomString(5, helper.NUMBERS)
		if success := mail.SendPasswordEmailSMTP([]string{user.Email}, password, false, user.Firstname+" "+user.Lastname, c.Request.Host); success {
			hashed, era := hash.HashPassword(password)
			if era != nil {
				respo.Message = os.Getenv("INTERNAL_SERVER_ERROR")
				c.JSON(http.StatusInternalServerError, respo)
				return
			}
			ctx = context.WithValue(ctx, "user_id", user.ID)
			ctx = context.WithValue(ctx, "password", hashed)
			changesuccess := userhandler.Service.ChangePassword(ctx)
			if !changesuccess {
				respo.Message = os.Getenv("INTERNAL_SERVER_ERROR")
				c.JSON(http.StatusInternalServerError, respo)
				return
			}
			respo.Message = "Email is sent to Your email account " + user.Email
			c.JSON(http.StatusOK, respo)
			return
		}
		respo.Message = os.Getenv("INTERNAL_SERVER_ERROR")
		c.JSON(http.StatusInternalServerError, respo)
		return
	} else {
		c.JSON(http.StatusNotFound, respo)
		respo.Message = "Account with this ID doesn't exist"
		return
	}

}

// Createuser creates user instance.
func (userhandler *UserHandler) CreateUser(c *gin.Context) {
	input := &struct {
		Firstname string `json:"firstname"`
		Lastname  string `json:"lastname"`
		Email     string `json:"email"`
	}{}
	resp := &model.LoginResponse{false, "Bad Request Body", nil}
	if er := c.BindJSON(input); er == nil {
		fail := false
		if !form.MatchesPattern(input.Email, form.EmailRX) {
			resp.Message = "Invalid email address!"
			fail = true
		}
		if len(strings.Trim(input.Firstname, " ")) <= 2 {
			resp.Message = " Invalid Fullname \n Your full name should include yours and your father's name!"
			fail = true
		}
		if !fail {
			// Generate Random password
			password := helper.GenerateRandomString(5, helper.NUMBERS)
			hash, er := helper.HashPassword(password)
			ctx := c.Request.Context()
			ctx = context.WithValue(ctx, "email", input.Email)
			if user, err := userhandler.Service.UserByEmail(ctx); user != nil || err == nil {
				resp.Message = "account with this email already exist."
				c.JSON(http.StatusUnauthorized, resp)
				return
			}

			if er != nil {
				resp.Message = " Internal Server error "
				resp.Success = false
				c.JSON(http.StatusInternalServerError, resp)
				return
			}
			user := &model.User{
				Firstname: input.Firstname,
				Lastname:  input.Lastname,
				Email:     input.Email, //
				Password:  hash,
			}
			// Send Email for the password if this doesn't work raise internal server error.
			if success := mail.SendPasswordEmailSMTP([]string{user.Email}, password, true, user.Firstname+" "+user.Lastname, c.Request.Host); success {
				ctx = c.Request.Context()
				ctx = context.WithValue(ctx, "user", user)
				if user, er = userhandler.Service.CreateUser(ctx); user != nil && er == nil {
					resp.Success = true
					resp.Message = func() string {
						return " user "
					}() + " created succesfully!"
					resp.User = user
					c.JSON(http.StatusOK, resp)
					return
				} else {
					if user != nil && er != nil {
						resp.Message = er.Error()
					} else {
						resp.Message = "Internal server error!"
					}
					c.JSON(http.StatusInternalServerError, resp)
					return
				}
			} else {
				resp.Message = "Internal server error!"
				c.JSON(http.StatusInternalServerError, resp)
				return
			}
		}
	}
	c.JSON(http.StatusBadRequest, resp)
}

// DeactivateAccount to deactivate an account usign the username and password
func (userhandler *UserHandler) DeactivateAccount(c *gin.Context) {
	email := c.Request.FormValue("email")
	password := c.Request.FormValue("password")
	resp := &struct {
		Msg string `json:"msg"`
	}{}
	if email == "" || password == "" {
		resp.Msg = os.Getenv("INVALID_INPUT")
		c.JSON(http.StatusUnauthorized, resp)
		return
	}
	ctx := c.Request.Context()
	if !form.MatchesPattern(email, form.EmailRX) {
		resp.Msg = "Invalid email address!"
		c.JSON(http.StatusBadRequest, resp)
		return
	}
	ctx = context.WithValue(ctx, "email", email)
	newuser, err := userhandler.Service.UserByEmail(ctx)
	if err != nil || newuser == nil {
		resp.Msg = "Invalid Username or Password!"
		c.JSON(401, resp)
		return
	} else {
		if newuser == nil {
			goto InvalidEmailsOrPassword
		}
		// comparing the hashed password and the password
		matches := hash.ComparePassword(newuser.Password, password)
		if !matches {
			goto InvalidEmailsOrPassword
		}
		ctx = context.WithValue(ctx, "email", email)
		if success := userhandler.Service.DeleteAccountByEmail(ctx); success {
			resp.Msg = "succesfuly deleted!"
			c.JSON(http.StatusOK, resp)
			return
		}
		resp.Msg = "Internal server error"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
InvalidEmailsOrPassword:
	{
		resp.Msg = state.InvalidEmailOrPassword
		c.JSON(401, resp)
		return
	}
}

func (userhandler *UserHandler) UpdateUser(c *gin.Context) {
	input := &struct {
		Firstname string `json:"firstname,omitempty"`
		Lastname  string `json:"lastname,omitempty"`
		Email     string `json:"email,omitempty"`
	}{}
	res := &struct {
		Succ bool   `json:"success"`
		Msg  string `json:"msg"`
	}{}
	if err := c.BindJSON(input); err == nil {
		fail := false
		if input.Email != "" && !form.MatchesPattern(input.Email, form.EmailRX) {
			res.Msg = "Invalid email address!"
			fail = true
		}
		if len(strings.Trim(input.Firstname, " ")) <= 2 {
			res.Msg = " Invalid First name \n Your first name should be \n > 5 character total!"
			fail = true
		}
		if len(strings.Trim(input.Lastname, " ")) <= 2 {
			res.Msg = " Invalid Last name \n Your last name should be \n > 5 character total!"
			fail = true
		}
		if fail {
			res.Succ = false
			c.JSON(http.StatusBadRequest, res)
			return
		}
		ctx := c.Request.Context()
		// Get the user By his ID and tell the newly Created Email to confirm that this is his email.
		session := c.Request.Context().Value("session").(*model.Session)
		if session == nil {
			res.Msg = "not authorized"
			c.JSON(http.StatusUnauthorized, res)
			return
		}
		ctx = context.WithValue(ctx, "user_id", session.ID)
		user, era := userhandler.Service.UserByID(ctx)
		if user == nil || era != nil {
			res.Msg = "internal server Error "
			c.JSON(http.StatusInternalServerError, res)
			return
		}
		changed := false
		if user.Firstname != input.Firstname {
			user.Firstname = input.Firstname
			changed = true
		}
		if user.Lastname != input.Lastname {
			user.Lastname = input.Lastname
			changed = true
		}
		if input.Email != "" && user.Email != input.Email {
			if success := mail.SendEmailChangeSMTP([]string{input.Email}, session.Password, user.Firstname+" "+user.Lastname, c.Request.Host); success {
				user.Email = input.Email
				changed = true
			} else {
				res.Msg = "internal server error!"
				c.JSON(http.StatusInternalServerError, res)
				return
			}
		}
		if changed {
			ctx = context.WithValue(ctx, "user", user)
			if user, er := userhandler.Service.UpdateUser(ctx); user == nil || er != nil {
				res.Msg = "update was not succesful please try again!"
				c.JSON(http.StatusNotModified, res)
				return
			}
			res.Succ = true
			res.Msg = "succesfully updated"
			c.JSON(http.StatusOK, res)
			return
		} else {
			// No update was made.
			res.Msg = "no update was made"
			c.JSON(http.StatusNotModified, res)
			return
		}
	}
	res.Succ = false
	res.Msg = "Bad Request"
	c.JSON(http.StatusBadRequest, res)
}

// ChangeProfilePicture
func (userhandler *UserHandler) ChangeProfilePicture(c *gin.Context) {
	var header *multipart.FileHeader
	var erro error
	var oldImage string
	erro = c.Request.ParseMultipartForm(99999999999)
	if erro != nil {
		c.Writer.WriteHeader(http.StatusBadRequest)
		return
	}
	image, header, erro := c.Request.FormFile("image")
	if erro != nil {
		c.JSON(http.StatusBadRequest, gin.H{})
		return
	}
	defer image.Close()
	if helper.IsImage(header.Filename) {
		newName := "images/profile/" + helper.GenerateRandomString(5, helper.CHARACTERS) + "." + helper.GetExtension(header.Filename)
		var newImage *os.File
		if strings.HasSuffix(os.Getenv("ASSETS_DIRECTORY"), "/") {
			newImage, erro = os.Create(os.Getenv("ASSETS_DIRECTORY") + newName)
		} else {
			newImage, erro = os.Create(os.Getenv("ASSETS_DIRECTORY") + "/" + newName)
		}
		if erro != nil {
			c.JSON(http.StatusInternalServerError, gin.H{})
			return
		}
		defer newImage.Close()
		oldImage = userhandler.Service.GetImageUrl(c.Request.Context())
		_, er := io.Copy(newImage, image)
		if er != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			return
		}
		ncon := context.WithValue(c.Request.Context(), "user_id", c.Request.Context().Value("session").(*model.Session).ID)
		ncon = context.WithValue(ncon, "image_url", newName)
		success := userhandler.Service.ChangeImageUrl(ncon)
		if success {
			if oldImage != "" {
				if strings.HasSuffix(os.Getenv("ASSETS_DIRECTORY"), "/") {
					er = os.Remove(os.Getenv("ASSETS_DIRECTORY") + oldImage)
				} else {
					er = os.Remove(os.Getenv("ASSETS_DIRECTORY") + "/" + oldImage)
				}
			}
			c.JSON(http.StatusOK, &model.ShortSuccess{Msg: newName})
			return
		}
		if strings.HasSuffix(os.Getenv("ASSETS_DIRECTORY"), "/") {
			er = os.Remove(os.Getenv("ASSETS_DIRECTORY") + newName)
		} else {
			er = os.Remove(os.Getenv("ASSETS_DIRECTORY") + "/" + newName)
		}
		c.JSON(http.StatusInternalServerError, gin.H{})
	} else {
		c.Writer.WriteHeader(http.StatusUnsupportedMediaType)
	}
}

// DeleteProfilePicture ...
func (userhandler *UserHandler) DeleteProfilePicture(c *gin.Context) {
	imageUrl := userhandler.Service.GetImageUrl(c.Request.Context())
	if imageUrl == "" {
		c.JSON(http.StatusNotFound, &model.ShortSuccess{Msg: "User doesn't have profile image."})
		return
	}
	success := userhandler.Service.DeleteProfilePicture(c.Request.Context())
	if success {
		if strings.HasSuffix(os.Getenv("ASSETS_DIRECTORY"), "/") {
			os.Remove(os.Getenv("ASSETS_DIRECTORY") + imageUrl)
		} else {
			os.Remove(os.Getenv("ASSETS_DIRECTORY") + "/" + imageUrl)
		}
		c.JSON(http.StatusOK, &model.ShortSuccess{Msg: "Profile Image is succesfully Deleted"})
		return
	} else {
		c.JSON(http.StatusInternalServerError, &model.ShortSuccess{Msg: "Deletion was not succesful."})
	}
}
