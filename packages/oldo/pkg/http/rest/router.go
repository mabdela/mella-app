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
	_ "github.com/mabdela/mella-backend/api"
	"github.com/mabdela/mella-backend/pkg/http/rest/middleware"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

// Route returns an http handler for the api.
func Route(rules middleware.Rules, adminhandler IAdminHandler, userhandler IUserHandler, coursehandler ICourseHandler, articlehandler IArticleHandler) *gin.Engine {
	router := gin.Default()
	chirouter := chi.NewRouter()
	router.Use(cors.New(cors.Config{
		AllowMethods: []string{"GET", "PUT", "POST", "DELETE", "OPTIONS"},
		// AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "http://localhost:8080", "http://localhost:808", "https://facebook.com"},
		AllowHeaders:     []string{"Content-type", "*"},
		AllowCredentials: true,
		AllowAllOrigins:  true,
	}))
	// Initializing google sign in parameters.
	{

		gothic.Store = GetCookieStore()
		// Registering the two call backs for the new sign in.....

		val := google.Endpoint.AuthURL
		println(val)

		googleProvider := google.New(
			os.Getenv("GOOGLE_CLIENT_ID"),
			os.Getenv("GOOGLE_CLIENT_SECRET"),
			"http://localhost:8080/auth/google/callback/")

		goth.UseProviders(
			googleProvider,
		)
	}
	router.GET("/logout", rules.Logout)
	router.POST("/api/admin/login", adminhandler.AdminLogin)
	router.PUT("/api/admin/password/new", rules.Authenticated(), adminhandler.ChangePassword)
	router.GET("/api/admin/password/forgot", rules.Authenticated(), adminhandler.ForgotPassword)
	router.POST("/api/superadmin/new", rules.Authenticated(), rules.Authorized(), adminhandler.CreateAdmin)
	router.PUT("/api/admin", rules.Authenticated(), rules.Authorized(), adminhandler.UpdateAdmin)
	router.PUT("/api/admin/profile/img", rules.Authenticated(), rules.Authorized(), adminhandler.ChangeProfilePicture)
	router.DELETE("/api/admin/profile/img", rules.Authenticated(), rules.Authorized(), adminhandler.DeleteProfilePicture)
	router.DELETE("/api/admin/deactivate", adminhandler.DeactivateAccount)
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
	// Not Tested.
	router.PUT("/api/user/profile/img", rules.Authenticated(), rules.Authorized(), userhandler.ChangeProfilePicture)
	router.DELETE("/api/user/profile/img", rules.Authenticated(), rules.Authorized(), userhandler.DeleteProfilePicture)
	router.DELETE("/api/user/deactivate", userhandler.DeactivateAccount)

	// This Routing will be changed later.
	// --------------------------------------------------------------------
	chirouter.Get("/auth/red", gothic.BeginAuthHandler)
	chirouter.Get("/auth/google/callback/", adminhandler.GoogleAdminLoginCallBack)
	chirouter.Get("/auth/google/admin/signin", gothic.BeginAuthHandler)
	chirouter.Get("/auth/google/user/signin", gothic.BeginAuthHandler)
	chirouter.Get("/auth/google/user/signin", gothic.BeginAuthHandler)
	chirouter.Get("/auth/google/user/signin/calllback/", userhandler.GoogleUserSigninCallBack)
	chirouter.Get("/auth/google/user/signup/calllback/", userhandler.GoogleUserSignupCallBack)
	// --------------------------------------------------------------------

	router.GET("/auth/*path", func(c *gin.Context) {
		log.Println(c.Request.URL.Path)
		chirouter.ServeHTTP(c.Writer, c.Request)
	})

	router.POST("/api/admin/article/new/", articlehandler.CreateArticle)
	// -------------------------------------------------------------
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
