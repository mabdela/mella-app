package rest

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
)

var fbOuthConfig = &oauth2.Config{
	RedirectURL:  "http://localhost:8080/facebook/callback",
	ClientID:     "1576663876058921",
	ClientSecret: "1fd320cba859fc3cec2bb0d3880b205e",
	Scopes:       []string{"public_profile", "email"},
	Endpoint:     facebook.Endpoint,
}

func FbLogin(c *gin.Context) {

	url := fbOuthConfig.AuthCodeURL("randomState")

	c.Redirect(http.StatusTemporaryRedirect, url)
	//http.Redirect(c.Writer, c.Request, url, http.StatusTemporaryRedirect)
}

func FbCallback(c *gin.Context) {

	log.Println("Inside FbCallback()")

	if c.Request.FormValue("state") != "randomState" {
		fmt.Println("invalid state")
		http.Redirect(c.Writer, c.Request, "/", http.StatusTemporaryRedirect)
		return
	}

	code := c.Request.FormValue("code")

	token, err := fbOuthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Println("couldnt generate token ", err.Error())

		http.Redirect(c.Writer, c.Request, "/", http.StatusTemporaryRedirect)
		return
	}
	res, _ := http.Get("https://graph.facebook.com/me?fields=id,name,email,first_name,last_name,picture,languages&access_token=" + token.AccessToken)
	if err != nil {
		fmt.Println("couldnt get the request from fb", err.Error())
		http.Redirect(c.Writer, c.Request, "/", http.StatusTemporaryRedirect)
		return
	}

	defer res.Body.Close()
	content, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("error while parsing to string ")
	}

	fmt.Fprint(c.Writer, string(content))
}
