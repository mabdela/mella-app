package main

import (
	"html/template"
	"log"
	"os"
	"sync"

	"github.com/mabdela/mella-app/packages/server/pkg/admin"
	"github.com/mabdela/mella-app/packages/server/pkg/article"
	"github.com/mabdela/mella-app/packages/server/pkg/comment"
	"github.com/mabdela/mella-app/packages/server/pkg/course"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/auth"
	"github.com/mabdela/mella-app/packages/server/pkg/http/rest/middleware"
	"github.com/mabdela/mella-app/packages/server/pkg/storage/mongodb"
	"github.com/mabdela/mella-app/packages/server/pkg/user"
	"github.com/subosito/gotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"golang.org/x/oauth2/google"
)

func init() {
	gotenv.Load()
}

var once sync.Once
var conn *mongo.Database
var connError error

var (
	templates          *template.Template
	GoogleAuthConfig   *oauth2.Config
	FacebookAuthConfig *oauth2.Config
)

func main() {
	once.Do(func() {
		// Instantiate Database Connection.
		conn = mongodb.ConnectMongoDB()
		if conn == nil {
			log.Println("Unable to connect ...")
			os.Exit(1)
		}
		log.Println("DB Connected ...")
	})

	GoogleAuthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/auth/google/callback/",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	FacebookAuthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/facebook/callback",
		ClientID:     os.Getenv("FACEBOOK_CLIENT_ID"),
		ClientSecret: os.Getenv("FACEBOOK_CLIENT_SECRET"),
		Scopes:       []string{"public_profile", "email"},
		Endpoint:     facebook.Endpoint,
	}

	authenticator := auth.NewAuthenticator(GoogleAuthConfig, FacebookAuthConfig)
	rules := middleware.NewRules(authenticator)

	adminrepo := mongodb.NewAdminRepo(conn)
	adminservice := admin.NewAdminService(adminrepo)
	adminhandler := rest.NewAdminHandler(authenticator, adminservice /*secretaryservice*/)

	userrepo := mongodb.NewUserRepo(conn)
	userser := user.NewUserService(userrepo)
	userhandler := rest.NewUserHandler(authenticator, userser)

	courserepo := mongodb.NewCourseRepo(conn)
	courseser := course.NewCourseService(courserepo)
	coursehandler := rest.NewCourseHandler(courseser, authenticator)

	commentrepo := mongodb.NewCommentRepo(conn)
	commentservice := comment.NewCommentService(commentrepo)
	commenthandler := rest.NewCommentHandler(authenticator, commentservice)
	outlinehandler := rest.NewOutlineHandler(authenticator)
	articlerepo := mongodb.NewArticleRepo(conn)
	articleservice := article.NewArticleService(articlerepo)
	articlehandler := rest.NewArticleHandler(articleservice, authenticator)
	oauthhandler := rest.NewOAuthHandler(userhandler, adminhandler, GoogleAuthConfig, FacebookAuthConfig)

	rest.Route(rules, authenticator, oauthhandler, adminhandler, userhandler, coursehandler, articlehandler, commenthandler, outlinehandler).Run(":8080")
}
