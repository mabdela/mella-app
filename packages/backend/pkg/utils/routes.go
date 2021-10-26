package utils

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/handlers/admin"
	"github.com/mabdela/mella/pkg/handlers/contents"
	superadmin "github.com/mabdela/mella/pkg/handlers/superAdmin"
	"github.com/mabdela/mella/pkg/handlers/user"
	"github.com/mabdela/mella/pkg/middlewares"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE", "OPTIONS"},
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "http://localhost:8080", "https://facebook.com"},
		AllowHeaders:     []string{"Content-type", "*"},
		AllowCredentials: true,
	}))

	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	api := r.Group("/api")
	{
		public := api.Group("/public")
		{
			public.POST("/login", user.Login)
			public.POST("/signup", user.Signup)
			public.POST("/logout", user.Logout)
		}
		protected := api.Group("/protected").Use(middlewares.Authz())
		{
			protected.GET("/profile", user.Profile)
			protected.POST("/comment", contents.AddComments)
			protected.POST("/updatelike", contents.UpdateLike)
			protected.DELETE("/comment/:comment_id", contents.DeleteComment)
			protected.GET("/comments/:topic_id", contents.LoadCommentsWithTopic)
			protected.GET("/userinfo/:user_id", user.FetchUserInfo)
			protected.POST("/update_quiz_info", contents.UpdateQuizInfo)
			protected.POST("/quiz_info", contents.QuizInfo)
			protected.PUT("/update_comment", contents.UpdateComment)
			protected.PUT("/update_user_info", user.UpdateUser)
		}
	}
	//************ admin *************
	adminApi := r.Group("/admin")
	{
		ProtectedAdmin := adminApi.Group("/protected").Use(middlewares.AdminAuth())
		{
			ProtectedAdmin.GET("/all_users", admin.GetAllUsers)
			ProtectedAdmin.GET("/user_by_email/:email", admin.GetUserByEmail)
			ProtectedAdmin.GET("/user_by_id/:id", admin.GetUserById)
			ProtectedAdmin.DELETE("/user_by_email/:email", admin.DeleteUserByEmail)
			ProtectedAdmin.DELETE("/user_by_id/:id", admin.DeleteUserById)
			ProtectedAdmin.PUT("/delete_quiz", admin.DeleteQuiz)
			ProtectedAdmin.DELETE("/delete_comment/:comment_id", admin.RemoveComment)
			ProtectedAdmin.PUT("/update_quiz", admin.ModifyQuiz)
			ProtectedAdmin.PUT("/change_password", admin.ChangePassword)
			ProtectedAdmin.GET("/quiz/:quiz_id", contents.GetQuiz) //for fetching quizes on admin side
			ProtectedAdmin.POST("/add_user", admin.InviteUser)     //for inviting new user
		}
		publicAdmin := adminApi.Group("/public")
		{
			publicAdmin.POST("/login", admin.AdminLogin)
			publicAdmin.POST("/logout", admin.Logout)
		}
	}
	// *****************************
	//********super admin
	super := r.Group("/superadmin")
	{
		super.GET("/all_admin", superadmin.AllAdmins)
		super.POST("/add_admin", superadmin.CreateAdmin)
		super.DELETE("/delete_admin/:id", superadmin.DeleteAdmin)
		super.GET("/admin_by_email/:email", superadmin.GetAdminByEmail)
		super.GET("/admin_by_name/:name", superadmin.GetAdminByName)
	}
	//******************

	english := r.Group("/english").Use(middlewares.Authz())
	{
		english.GET("/outline", contents.GetOutline)
		english.GET("/quiz/:quiz_id", contents.GetQuiz)
	}

	r.POST("/updatelike", contents.UpdateLike)               //change the route by /api/protected/updatelike
	r.DELETE("/comment/:comment_id", contents.DeleteComment) //change the route by /api/protected/comment/id
	r.GET("/userinfo/:user_id", user.FetchUserInfo)          //change the route by /api/protected/userinfo/id

	r.GET("/comments/:topic_id", contents.LoadCommentsWithTopic) //this route is used by admin side that's why I left it here
	r.POST("/add_quiz", admin.AddQuiz)                           //this is also used by admin side

	return r
}
