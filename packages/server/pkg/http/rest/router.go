package rest

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-chi/chi"
	"github.com/gorilla/sessions"
	"github.com/julienschmidt/httprouter"

	_ "github.com/mabdela/mella-app/packages/server/api"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/auth"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/middleware"
)

// Route returns an http handler for the api.
func Route(rules middleware.Rules, authenticator auth.Authenticator, oauthHandler IOAuthHandler, adminhandler IAdminHandler, userhandler IUserHandler, coursehandler ICourseHandler, articlehandler IArticleHandler, commenthandler ICommentHandler, outlinehundler IOutlineHandler) *gin.Engine {
	router := gin.Default()

	chirouter := chi.NewRouter()
	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE", "OPTIONS"},
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "http://localhost:8080", "http://localhost:808", "https://facebook.com"},
		AllowHeaders:     []string{"Content-type", "Authorization"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
		// AllowAllOrigins:  true,

	}))
	// Initializing google sign in parameters.
	router.GET("/logout", rules.Logout)
	router.POST("/api/admin/login", adminhandler.AdminLogin)
	router.PUT("/api/admin/password/new", rules.Authenticated(), adminhandler.ChangePassword)
	router.GET("/api/admin/password/forgot", rules.Authenticated(), adminhandler.ForgotPassword)
	router.POST("/api/superadmin/new", adminhandler.CreateAdmin)
	router.PUT("/api/admin", rules.Authenticated(), rules.Authorized(), adminhandler.UpdateAdmin)
	router.PUT("/api/admin/profile/img", rules.Authenticated(), rules.Authorized(), adminhandler.ChangeProfilePicture)
	router.DELETE("/api/admin/profile/img", rules.Authenticated(), rules.Authorized(), adminhandler.DeleteProfilePicture)
	router.DELETE("/api/admin/deactivate", adminhandler.DeactivateAccount)

	router.GET("/api/admin/allusers", rules.Authenticated(), rules.Authorized(), userhandler.AllUsers)
	router.GET("/api/admin/user_by_id/:user_id", rules.Authenticated(), rules.Authorized(), userhandler.GetUsersById)
	router.GET("/api/admin/user_by_email/:email", rules.Authenticated(), rules.Authorized(), userhandler.GetUsersByEmail)
	router.DELETE("/api/admin/user_by_id/:user_id", rules.Authenticated(), rules.Authorized(), userhandler.DeleteUsersById)
	router.DELETE("/api/admin/user_by_email/:email", rules.Authenticated(), rules.Authorized(), userhandler.DeleteUsersByEmail)

	router.GET("/api/admin/admin_by_id/:admin_id", rules.Authenticated(), rules.Authorized(), adminhandler.GetAdminById)
	router.GET("/api/admin/admin_by_Email/:email", rules.Authenticated(), rules.Authorized(), adminhandler.GetAdminByEmail)
	router.DELETE("/api/admin/admin_by_email/:email", rules.Authenticated(), rules.Authorized(), adminhandler.DeleteAdminByEmail)
	router.DELETE("/api/admin/admin_by_id/:admin_id", rules.Authenticated(), rules.Authorized(), adminhandler.DeleteAdminById)
	// New Tested
	router.GET("/api/admins", rules.Authenticated(), rules.Authorized(), adminhandler.GetAllAdmins)
	// Users Route here
	router.POST("/api/user/login", userhandler.UserLogin)
	router.PUT("/api/user/password/new", rules.Authenticated(), rules.Authorized(), userhandler.ChangePassword)
	router.GET("/api/user/password/forgot", rules.Authenticated(), userhandler.ForgotPassword)
	router.POST("/api/user/new", userhandler.CreateUser)
	router.PUT("/api/user", rules.Authenticated(), rules.Authorized(), userhandler.UpdateUser)

	router.POST("/api/superadmin/course/new", rules.Authenticated(), rules.Authorized(), coursehandler.CreateCourse)
	router.PUT("/api/superadmin/course", rules.Authenticated(), rules.Authorized(), coursehandler.UpdateCourse)
	router.PUT("/api/superadmin/course/picture", rules.Authenticated(), rules.Authorized(), coursehandler.UploadCourseImage)
	router.DELETE("/api/superadmin/course/delete", rules.Authenticated(), rules.Authorized(), coursehandler.RemoveCourse)
	// This course handlers are newly added  , JENO Test them and edit something if needed
	router.GET("/api/course/", rules.Authenticated(), coursehandler.GetCourseByID)
	router.GET("/api/courses/", rules.Authenticated(), coursehandler.GetAllCourses)

	router.PUT("/api/user/profile/img", rules.Authenticated(), rules.Authorized(), userhandler.ChangeProfilePicture)
	router.DELETE("/api/user/profile/img", rules.Authenticated(), rules.Authorized(), userhandler.DeleteProfilePicture)
	router.DELETE("/api/user/deactivate", userhandler.DeactivateAccount)
	//comment routes
	router.POST("/api/comments/new", rules.Authenticated(), rules.Authorized(), commenthandler.AddComments)
	router.GET("/api/article/comments/:article_id", rules.Authenticated(), rules.Authorized(), commenthandler.LoadComments)
	router.PUT("/api/article/comment/update_like", rules.Authenticated(), rules.Authorized(), commenthandler.UpdateCommentsLike)
	router.DELETE("api/article/comment/delete_comment/:commentId", rules.Authenticated(), rules.Authorized(), commenthandler.RemoveComment)
	// The Final Routes for Google and Facebook Authentication.
	// -----------------------------------------------------------------------------

	chirouter.Get("/auth/admin/signin", authenticator.GoogleAdminSignin)
	chirouter.Get("/auth/user/signin", authenticator.GoogleUserSignin)
	chirouter.Get("/auth/user/signup", authenticator.GoogleUserSignUP)
	chirouter.Get("/auth/google/callback/", oauthHandler.GoogleHandleCallback)
	// -----------------------Facebook ------------------------------------------
	chirouter.Get("/auth/facebook/admin/signin", authenticator.FaceBookAdminSignin)
	chirouter.Get("/auth/facebook/user/signin", authenticator.FaceBookUserSignin)
	// -----------------------------------------------------------------------------

	router.GET("/auth/*path", func(c *gin.Context) {
		log.Println(c.Request.URL.Path)
		chirouter.ServeHTTP(c.Writer, c.Request)
	})

	// ----------------------------------------------------------------
	router.POST("/api/admin/article/new", rules.Authenticated(), rules.Authorized(), articlehandler.CreateArticle)
	router.PUT("/api/admin/article", rules.Authenticated(), rules.Authorized(), articlehandler.UpdateArticle)
	router.GET("/api/admin/article", rules.Authenticated(), articlehandler.GetArticleByID)
	router.POST("/api/admin/article/image/new", rules.Authenticated(), articlehandler.ChangeArticleImage)
	router.POST("/api/admin/article/subarticle/image/new", rules.Authenticated(), articlehandler.ChangeSubArticleImage)
	// ----------------------------------------------------------------
	router.RouterGroup.Use(FilterDirectory())
	{
		router.StaticFS("/images/", http.Dir(os.Getenv("ASSETS_DIRECTORY")+"images/"))
	}

	//load outiline
	router.GET("/api/user/outline/:course_id", rules.Authenticated(), rules.Authorized(), outlinehundler.GetOutline)
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
func GetCookieStore() *sessions.CookieStore {
	key := os.Getenv("SESSION_SECRET_KEY") // Replace with your SESSION_SECRET or similar
	maxAge := 86400 * 30                   // 30 days
	isProd := false                        // Set to true when serving over https
	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true // HttpOnly should always be enabled
	store.Options.Secure = isProd
	return store
}
