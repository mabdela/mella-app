package middlewares

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/auth"
)

func Authz() gin.HandlerFunc {
	return func(c *gin.Context) {

		clientToken, err := c.Request.Cookie("jwt")

		if err != nil {
			log.Println(err.Error())
		}

		log.Println(clientToken.Name)

		if clientToken.Value == "" {
			c.JSON(http.StatusForbidden, gin.H{"msg":"No Authorization header provided"})
			c.Abort()
			return
		}

		jwtWrapper := auth.JwtWrapper{
			SecretKey: "verysecretkey",
			Issuer:    "AuthService",
		}

		claims, err := jwtWrapper.ValidateToken(clientToken.Value)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"msg":err.Error()})
			c.Abort()
			return
		}
		c.Set("email", claims.Email)
		c.Next()
	}
}

//admin login
func AdminAuth() gin.HandlerFunc {
	return func(c *gin.Context) {

		clientToken, err := c.Request.Cookie("jwt")

		if err != nil {
			log.Println(err.Error())
		}

		log.Println(clientToken.Name)

		if clientToken.Value == "" {
			c.JSON(http.StatusForbidden, gin.H{"msg":"No Authorization header provided"})
			c.Abort()
			return
		}

		jwtWrapper := auth.JwtWrapper{
			SecretKey: "adminsecretekey", //this is the diffrence
			Issuer:    "AuthService",
		}

		claims, err := jwtWrapper.ValidateToken(clientToken.Value)
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}
		c.Set("email", claims.Email)
		c.Next()
	}
}

// for SuperAdmin Authorization
func BasicAuth() gin.HandlerFunc {

	return gin.BasicAuth(gin.Accounts{
		"superUsername": "password",
	})

}
