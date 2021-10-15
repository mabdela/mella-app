package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mabdela/mella/pkg/utils"
	"github.com/stretchr/testify/assert"
)

func TestPingRoute(t *testing.T) {
	router := utils.SetupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "pong", w.Body.String())
}
