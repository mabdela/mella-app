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

/*
func TestAddQuiz(t *testing.T) {

	var actualResult models.Questions

	importedQ := importedQuiz{
		Topic_id:    "101",
		Question:    "test question",
		Choice:      []string{"a", "b", "c", "d"},
		Answer:      0,
		Explanation: "test explanation",
	}

	payload, err := json.Marshal(&importedQ)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/add_quiz", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	AddQuiz(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult.Questions)
	assert.NoError(t, err)

	lastindex := len(actualResult.Questions) - 1
	assert.Equal(t, importedQ.Question, actualResult.Questions[lastindex].Question)
	assert.Equal(t, importedQ.Answer, actualResult.Questions[lastindex].Answer)
	assert.Equal(t, importedQ.Choice, actualResult.Questions[lastindex].Choice)
	assert.Equal(t, importedQ.Explanation, actualResult.Questions[lastindex].Explanation)
	assert.Equal(t, importedQ.Keywords, actualResult.Questions[lastindex].Keywords)
}
*/
func TestModifyQuiz(t *testing.T) {

	var actualResult models.Question
	question := questionPayload{

		TopicId:     "101",
		Id:          11,
		Question:    "test update",
		Choice:      []string{"a", "b", "c", "d"},
		Answer:      0,
		Explanation: "test explanation",
	}

	payload, err := json.Marshal(&question)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/updatelike", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	ModifyQuiz(c)

	assert.Equal(t, http.StatusOK, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, question.Answer, actualResult.Answer)
	assert.Equal(t, question.Choice, actualResult.Choice)
	assert.Equal(t, question.Explanation, actualResult.Explanation)
	assert.Equal(t, question.Id, actualResult.Id)
	assert.Equal(t, question.Question, actualResult.Question)
}
