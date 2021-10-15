package user

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mabdela/mella/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestSignUp(t *testing.T) {
	var actualResult models.User

	user := models.User{
		Firstname: "Test",
		Lastname:  "User",
		Email:     "jwt@email.com",
		Password:  "secret",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/public/signup", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	Signup(c)
	if w.Code == 200 {
		assert.Equal(t, http.StatusOK, w.Code)

		err = json.Unmarshal(w.Body.Bytes(), &actualResult)
		assert.NoError(t, err)

		assert.Equal(t, user.Firstname, actualResult.Firstname)
		assert.Equal(t, user.Lastname, actualResult.Lastname)
		assert.Equal(t, user.Email, actualResult.Email)
	} else {
		assert.Equal(t, 403, w.Code)

		err = json.Unmarshal(w.Body.Bytes(), &actualResult)
		assert.NoError(t, err)
	}

}

func TestSignUpInvalidJSON(t *testing.T) {
	user := "test"

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/public/signup", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	Signup(c)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestLogin(t *testing.T) {
	user := LoginPayload{
		Email:    "jwt@email.com",
		Password: "secret",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/public/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	Login(c)

	assert.Equal(t, http.StatusOK, w.Code)

}

func TestLoginInvalidJSON(t *testing.T) {
	user := "test"

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/public/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	Login(c)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestLoginInvalidCredentials(t *testing.T) {
	user := LoginPayload{
		Email:    "jwt@email.com",
		Password: "invalid",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/public/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	Login(c)

	assert.Equal(t, http.StatusUnauthorized, w.Code)

}
