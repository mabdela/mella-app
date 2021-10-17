package admin

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/stretchr/testify/assert"
)

func TestGetAllUsers(t *testing.T) {

	var actualResult []models.UserResponse

	request, err := http.NewRequestWithContext(context.Background(), "GET", "http://localhost:8080/admin/protected/all_users", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	GetAllUsers(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)
}

func TestGetUserByEmail(t *testing.T) {

	var actualResult models.UserResponse

	expected_user := models.UserResponse{
		Firstname: "For",
		Lastname:  "TestCase",
		Email:     "donotdelete@gmail.com",
	}
	request, err := http.NewRequest("GET", "http://localhost:8080/admin/protected/user_by_email/:email", nil)
	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)

	c.Params = []gin.Param{
		{
			Key:   "email",
			Value: "donotdelete@gmail.com",
		},
	}
	assert.NoError(t, err)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	GetUserByEmail(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, expected_user.Email, actualResult.Email)
	assert.Equal(t, expected_user.Firstname, actualResult.Firstname)
	assert.Equal(t, expected_user.Lastname, actualResult.Lastname)

}

func TestGetUserById(t *testing.T) {

	var actualResult models.UserResponse

	expected_user := models.UserResponse{
		Firstname: "For",
		Lastname:  "TestCase",
		Email:     "donotdelete@gmail.com",
	}

	request, err := http.NewRequestWithContext(context.Background(), "GET", "http://localhost:8080/admin/protected/user_by_id/:id", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "6167f3d4d54d016b9a268f2a",
		},
	}
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	GetUserById(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, expected_user.Email, actualResult.Email)
	assert.Equal(t, expected_user.Firstname, actualResult.Firstname)
	assert.Equal(t, expected_user.Lastname, actualResult.Lastname)

}

func TestDeleteUserByEmail(t *testing.T) {

	var actualResult models.UserResponse
	request, err := http.NewRequest("DELETE", "http://localhost:8080/admin/protected/user_by_email/:email", nil)
	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)

	c.Params = []gin.Param{
		{
			Key:   "email",
			Value: "test@email.com",
		},
	}
	assert.NoError(t, err)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	GetUserByEmail(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)
}
