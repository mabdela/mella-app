package rest

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/julienschmidt/httprouter"
	_ "github.com/mabdela/mella-backend/api"
	"github.com/mabdela/mella-backend/pkg/http/rest/middleware"
)

// Route returns an http handler for the api.
func Route(rules middleware.Rules, adminhandler IAdminHandler, userhandler IUserHandler, coursehandler ICourseHandler, commenthandler IcommentHandler) *gin.Engine {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowMethods: []string{"GET", "PUT", "POST", "DELETE", "OPTIONS"},
		// AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "http://localhost:8080", "http://localhost:808", "https://facebook.com"},
		AllowHeaders:     []string{"Content-type", "*"},
		AllowCredentials: true,
		AllowAllOrigins:  true,
	}))
	router.GET("/logout", rules.Logout)
	router.POST("/api/admin/login", adminhandler.AdminLogin) //sent
	router.PUT("/api/admin/password/new", rules.Authenticated(), rules.Authorized(), adminhandler.ChangePassword)
	router.GET("/api/admin/password/forgot", adminhandler.ForgotPassword)                         //not
	router.POST("/api/superadmin/new", adminhandler.CreateAdmin)                                  //sent
	router.PUT("/api/admin", rules.Authenticated(), rules.Authorized(), adminhandler.UpdateAdmin) //session
	router.PUT("/api/admin/profile/img", rules.Authenticated(), rules.Authorized(), adminhandler.ChangeProfilePicture)
	router.DELETE("/api/admin/profile/img", rules.Authenticated(), rules.Authorized(), adminhandler.DeleteProfilePicture)
	router.DELETE("/api/admin/deactivate", adminhandler.DeactivateAccount) // using email
	// New Tested
	router.GET("/api/admins", adminhandler.GetAllAdmins) //sent
	// Users Route here
	router.POST("/api/user/login", userhandler.UserLogin)
	router.PUT("/api/user/password/new", rules.Authenticated(), rules.Authorized(), userhandler.ChangePassword)
	router.GET("/api/user/password/forgot", userhandler.ForgotPassword)
	router.POST("/api/user/new", userhandler.CreateUser)
	router.PUT("/api/user", rules.Authenticated(), rules.Authorized(), userhandler.UpdateUser)

	router.POST("/api/superadmin/course/new", rules.Authenticated(), rules.Authorized(), coursehandler.CreateCourse)
	router.PUT("/api/superadmin/course", rules.Authenticated(), rules.Authorized(), coursehandler.UpdateCourse)
	router.PUT("/api/superadmin/course/picture", rules.Authenticated(), rules.Authorized(), coursehandler.UploadCourseImage)
	router.DELETE("/api/superadmin/course/delete",rules.Authenticated(), rules.Authorized(), coursehandler.RemoveCourse)
	// Not Tested.
	router.PUT("/api/user/profile/img", rules.Authenticated(), rules.Authorized(), userhandler.ChangeProfilePicture)
	router.DELETE("/api/user/profile/img", rules.Authenticated(), rules.Authorized(), userhandler.DeleteProfilePicture)
	router.DELETE("/api/user/deactivate", userhandler.DeactivateAccount)
	//comments routes
	router.POST("/api/comments/new", commenthandler.AddComments)
	router.GET("/api/article/comments/:article_id", commenthandler.LoadComments)
	router.PUT("/api/article/comment/update_like", commenthandler.UpdateCommentsLike)
	router.DELETE("api/article/comment/delete/:commentId", rules.Authenticated(), rules.Authorized(),commenthandler.RemoveComment)
	//
	router.RouterGroup.Use(FilterDirectory(), rules.Authenticated())
	{
		router.StaticFS("/images/", http.Dir(os.Getenv("ASSETS_DIRECTORY")+"images/"))
	}

	return router
}

// AccessControl ... a method.
func AccessControl(h httprouter.Handle) httprouter.Handle {
	return httprouter.Handle(func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")
		if r.Method == "OPTIONS" {
			return
		}
		h(w, r, params)
	})
}

func FilterDirectory() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println(" Filter Directory ")
		if strings.HasSuffix(c.Request.URL.Path, "/") {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		c.Next()
	}
}
