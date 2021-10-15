package user

import (
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/stretchr/testify/assert"
)

func TestProfile(t *testing.T) {
	var profile models.User

	err := models.InitDatabase()
	assert.NoError(t, err)

	user := models.User{
		Email:     "jwt@email.com",
		Password:  "secret",
		Firstname: "Test",
		Lastname:  "User",
	}

	err = user.HashPassword(user.Password)
	assert.NoError(t, err)

	err, _ = user.CreateUserRecord()
	assert.NoError(t, err)

	request, err := http.NewRequest("GET", "/api/protected/profile", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	c.Set("email", "jwt@email.com")

	Profile(c)

	err = json.Unmarshal(w.Body.Bytes(), &profile)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, w.Code)

	log.Println(profile)

	assert.Equal(t, user.Email, profile.Email)
	assert.Equal(t, user.Firstname, profile.Firstname)
	assert.Equal(t, user.Lastname, profile.Lastname)

}

func TestProfileNotFound(t *testing.T) {
	var profile models.User

	err := models.InitDatabase()
	assert.NoError(t, err)

	request, err := http.NewRequest("GET", "/api/protected/profile", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	c.Set("email", "notfound@email.com")

	Profile(c)

	err = json.Unmarshal(w.Body.Bytes(), &profile)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusNotFound, w.Code)

}
