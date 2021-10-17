package superadmin

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/handlers/admin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/stretchr/testify/assert"
)

func TestAllAdmins(t *testing.T) {

	var actualResult []admin.AdminModel

	request, err := http.NewRequestWithContext(context.Background(), "GET", "http://localhost:8080/superadmin/all_admin", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	AllAdmins(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

}
func TestCreateAdmin(t *testing.T) {

	var actualResult []admin.AdminModel

	adminPayload := admin.AdminModel{
		Email:     "test@gmail.com",
		Username:  "testUser",
		Password:  "testPassword",
		FirstName: "test",
		LastName:  "acount",
	}

	payload, err := json.Marshal(&adminPayload)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/add_quiz", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	CreateAdmin(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	lastindex := len(actualResult) - 1
	assert.Equal(t, adminPayload.Email, actualResult[lastindex].Email)
	assert.Equal(t, adminPayload.FirstName, actualResult[lastindex].FirstName)
	assert.Equal(t, adminPayload.LastName, actualResult[lastindex].LastName)
	assert.Equal(t, adminPayload.Username, actualResult[lastindex].Username)
}

func TestDeleteAdmin(t *testing.T){
	
	request, err := http.NewRequest("DELETE", "http://localhost:8080/superadmin//delete_admin/:email", nil)
	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)

	c.Params = []gin.Param{
		{
			Key:   "email",
			Value: "test@gmail.com",
		},
	}
	assert.NoError(t, err)
	c.Request = request
	err = models.InitDatabase()
	assert.NoError(t, err)

	DeleteAdmin(c)

	assert.Equal(t, http.StatusOK, w.Code)
}