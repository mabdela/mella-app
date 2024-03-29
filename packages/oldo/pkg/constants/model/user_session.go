package model

import (
	"github.com/dgrijalva/jwt-go"
)

// Session representing the Session to Be sent with the request body
// no saving of a session in the database so i Will use this session in place of
type Session struct {
	jwt.StandardClaims
	ID       string
	Email    string //
	Password string //
	Role     string //  state.SUPERADMIN , state.ADMIN , state.USER
}

// LoginInProgress  a struct to login with the password
type LoginInProgress struct {
}
