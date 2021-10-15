package middlewares

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/mabdela/mella/pkg/auth"
	"github.com/mabdela/mella/pkg/handlers/user"
	"github.com/stretchr/testify/assert"
)

func TestAuthzNoHeader(t *testing.T) {
	router := gin.Default()
	router.Use(Authz())
	router.GET("/api/protected/profile", user.Profile)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/protected/profile", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusForbidden, w.Code)

}

func TestAuthzInvalidTokenFormat(t *testing.T) {
	router := gin.Default()
	router.Use(Authz())
	router.GET("/api/protected/profile", user.Profile)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/protected/profile", nil)
	req.Header.Add("Authorization", "test")

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestAuthzInvalidToken(t *testing.T) {
	invalidToken := "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

	router := gin.Default()
	router.Use(Authz())
	router.GET("/api/protected/profile", user.Profile)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/protected/profile", nil)

	req.Header.Add("Authorization", invalidToken)
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusUnauthorized, w.Code)

}

func TestValidToken(t *testing.T) {
	var response models.User
	err := models.InitDatabase()
	assert.NoError(t, err)

	userInfo := models.User{
		Email:     "test@email.com",
		Password:  "secret",
		Firstname: "Test",
		Lastname:  "User",
	}

	jwtWrapper := auth.JwtWrapper{
		SecretKey:       "verysecretkey",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	token, err := jwtWrapper.GenerateToken(userInfo.Email)
	fmt.Println("Token : ", token)
	assert.NoError(t, err)

	err = userInfo.HashPassword(userInfo.Password)
	assert.NoError(t, err)

	result, _ := userInfo.CreateUserRecord()
	assert.NoError(t, result)

	router := gin.Default()
	router.Use(Authz())

	router.GET("/api/protected/profile", user.Profile)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/protected/profile", nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))

	router.ServeHTTP(w, req)

	err = json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "test@email.com", response.Email)
	assert.Equal(t, "Test", response.Firstname)
	assert.Equal(t, "User", response.Lastname)

}
