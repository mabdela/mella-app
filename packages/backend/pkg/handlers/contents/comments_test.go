package contents

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

func TestAddComments(t *testing.T) {

	var actualResult models.CommentResponse

	commentsFromFront := CommentFromFront{
		Content:  "the comment body",
		Topic_id: "101",
		UserId:   "614cd22f73601af2d02407ed",
	}

	payload, err := json.Marshal(&commentsFromFront)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/comments", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	AddComments(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, commentsFromFront.Content, actualResult.Content)
	assert.Equal(t, commentsFromFront.Topic_id, actualResult.Topic_id)
	// assert.Equal(t, commentsFromFront.UserId, actualResult.UserId)
}

//the reason behined this test is failing is the url is not passing param like browsers

func TestLoadComments(t *testing.T) {

	var actualResult models.CommentResponse
	// this data is going to be modified
	expected_user := models.CommentResponse{
		Likes:    []string{},
		Content:  "the comment body",
		Topic_id: "101",
	}

	request, err := http.NewRequest("GET", "http://localhost:8080/comment/:comment_id", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Params = []gin.Param{
		{
			Key:   "comment_id",
			Value: "616f1c83767fd6b340901564",
		},
	}
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	LoadComments(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, expected_user.Content, actualResult.Content)
	assert.Equal(t, expected_user.Likes, actualResult.Likes)
	assert.Equal(t, expected_user.Topic_id, actualResult.Topic_id)
}

func TestUpdateLike(t *testing.T) {

	var actualResult CommentInfo
	commentInfo := CommentInfo{
		UserId:    "6138afc9ca5920f9d864a956",
		CommentId: "613bc34d9b0089c0dd29f138",
	}

	payload, err := json.Marshal(&commentInfo)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/updatelike", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	UpdateLike(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

}
