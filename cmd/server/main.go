package main

import (
	"html/template"
	"log"
	"os"
	"sync"

	"github.com/mabdela/mella-backend/pkg/admin"
	"github.com/mabdela/mella-backend/pkg/http/rest"
	"github.com/mabdela/mella-backend/pkg/http/rest/auth"
	"github.com/mabdela/mella-backend/pkg/http/rest/middleware"
	"github.com/mabdela/mella-backend/pkg/storage/mongodb"
	"github.com/mabdela/mella-backend/pkg/user"
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
		if conn == nil {
			log.Println("Unable to connect ...")
			os.Exit(1)
		}
		log.Println("DB Connected ...")
	})

	authenticator := auth.NewAuthenticator()
	rules := middleware.NewRules(authenticator)

	adminrepo := mongodb.NewAdminRepo(conn)
	adminservice := admin.NewAdminService(adminrepo)
	adminhandler := rest.NewAdminHandler(authenticator, adminservice /*secretaryservice*/)

	userrepo := mongodb.NewUserRepo(conn)
	userser := user.NewUserService(userrepo)
	userhandler := rest.NewUserHandler(authenticator, userser)

	rest.Route(rules, adminhandler, userhandler).Run(":8080")
}
