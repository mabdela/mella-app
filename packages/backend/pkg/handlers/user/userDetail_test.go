package user

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestFetchUserDetail(t *testing.T) {

	var actualResult models.User
	id, _ := primitive.ObjectIDFromHex("61730597550a7ccef516f4d5")
	expected_user := models.User{
		ID:        id,
		Firstname: "DoNot",
		Lastname:  "Delete",
		Email:     "donotdelte@gmail.com",
	}

	request, err := http.NewRequest("GET", "http://localhost:8080/userinfo/:user_id", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Params = []gin.Param{
		{
			Key:   "user_id",
			Value: "61730597550a7ccef516f4d5",
		},
	}
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	FetchUserInfo(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, expected_user.ID, actualResult.ID)
	assert.Equal(t, expected_user.Firstname, actualResult.Firstname)
	assert.Equal(t, expected_user.Lastname, actualResult.Lastname)
	assert.Equal(t, expected_user.Email, actualResult.Email)
}
