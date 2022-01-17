package auth

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

// GetSession returns a Session Struct Having the Data of the User
func (sessh *authenticator) GetEmailInfo(secretInfo string) (*model.EmailInfo, error) {
	defer recover()
	// go and check for the authorization header
	token := secretInfo
	token = strings.TrimPrefix(token, "Bearer ")
	if token == "" {
		return nil, nil
	}
	secret := &model.EmailInfo{}
	tkn, err := jwt.ParseWithClaims(token, secret, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SESSION_SECRET_KEY")), nil
	})
	if err != nil {
		return nil, err
	}
	if tkn.Valid {
		return secret, nil
	}
	return nil, errors.New(" invalid secret information ")
}

// SaveSession to save the Session in the User Session Header
func (sessh *authenticator) GetSecreteEmailInfo(email string) (string, bool) {
	emailSecret := &model.EmailInfo{}
	// Declare the expiration time of the token
	expirationTime := time.Now().Add(24 * time.Hour)
	emailSecret.StandardClaims = jwt.StandardClaims{
		// In JWT, the expiry time is expressed as unix milliseconds
		ExpiresAt: expirationTime.Unix(),
		// HttpOnly:  true,
	}
	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, emailSecret)
	// Create the JWT string
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	if err != nil {
		return "", false
	}
	return tokenString, true
}
