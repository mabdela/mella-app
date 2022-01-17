package rest

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/auth"
)

type IOutlineHandler interface {
	GetOutline(c *gin.Context)
}

type OutlineHandler struct {
	Authenticator auth.Authenticator
}

func NewOutlineHandler(auth auth.Authenticator) IOutlineHandler {

	return &OutlineHandler{
		Authenticator: auth,
	}
}

func loadOutlineJson(courseId string) ([]byte, error) {
	fmt.Println(courseId)
	pwd, err := os.Getwd()
	if err != nil {
		log.Println(err)
	}
	fmt.Println(pwd)
	pwd = strings.TrimRight(pwd, "cmd/server")
	fmt.Println(pwd)
	path := pwd + "es/server/content/english/outline.json" //to be modified
	// path = "/home/jeno/Desktop/jeno1990/mellaye2/mella-app/packages/server/content/english/outline.json"

	jsonFile, err := os.Open(path)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	log.Println("Successfully opened outline.json")
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)

	return byteValue, nil
}

// Intentially did not add the file to the database
// For now just reading from the json file.
func (handler *OutlineHandler) GetOutline(c *gin.Context) {
	courseId := c.Param("course_id")
	log.Println("Getting the outline")

	byteValue, err := loadOutlineJson(courseId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": err.Error()})
		c.Abort()
		return
	}
	var outline model.Outline
	json.Unmarshal(byteValue, &outline)

	c.JSON(http.StatusOK, outline)

}
