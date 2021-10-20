package admin

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/stretchr/testify/assert"
)

func TestLogin(t *testing.T) {
	user := AdminLoginPayload{
		Email:    "donotdelte@gmail.com",
		Password: "password",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/admin/public/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	AdminLogin(c)

	assert.Equal(t, http.StatusOK, w.Code)

}

func TestAdminLoginInvalidCredentials(t *testing.T) {
	user := AdminLoginPayload{
		Email:    "admin@gmail.com",
		Password: "invalid",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/admin/public/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	AdminLogin(c)

	assert.Equal(t, http.StatusUnauthorized, w.Code)

}
