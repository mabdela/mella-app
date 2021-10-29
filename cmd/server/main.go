package main

import (
	"html/template"
	"os"
	"sync"

	"github.com/samuael/Project/mellaye/pkg/admin"
	"github.com/samuael/Project/mellaye/pkg/http/rest"
	"github.com/samuael/Project/mellaye/pkg/http/rest/auth"
	"github.com/samuael/Project/mellaye/pkg/http/rest/middleware"
	"github.com/samuael/Project/mellaye/pkg/storage/mongodb"
	"github.com/subosito/gotenv"
	"go.mongodb.org/mongo-driver/mongo"
)

func init() {
	gotenv.Load()
}

var once sync.Once
var conn *mongo.Database
var connError error

var templates *template.Template

func main() {
	once.Do(func() {
		// Instantiate Database Connection.
		conn = mongodb.ConnectMongoDB()
		if connError != nil {
			os.Exit(1)
		}
		templates = template.Must(template.ParseGlob(os.Getenv("PATH_TO_TEMPLATES") + "*.html"))
	})
	// defer conn.Close()

	authenticator := auth.NewAuthenticator()
	rules := middleware.NewRules(authenticator)

	adminrepo := mongodb.NewAdminRepo(conn)
	adminservice := admin.NewAdminService(adminrepo)
	adminhandler := rest.NewAdminHandler(authenticator, adminservice /*secretaryservice*/)

	rest.Route(rules, adminhandler).Run(":8080")
}
