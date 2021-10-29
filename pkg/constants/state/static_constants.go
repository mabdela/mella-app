package state

var (
	// ImageExtensions list of valid image extensions
	ImageExtensions = []string{"jpeg", "png", "jpg", "gif", "btmp"}
)

const (
	// InvalidUsernameORPassword ...
	InvalidUsernameORPassword = " Invalid Username or Password "
	// InvalidEmailOrPassword
	InvalidEmailOrPassword = " Invalid email or password! "
	// SuccesfulyLoggedIn ...
	SuccesfulyLoggedIn = " Succesfuly Logged In "

	// This constant values listed below are roles of the system
	// those who directly interact with the system .

	SUPERADMIN = "superadmin"
	// ADMIN ...
	ADMIN = "admin"
	// USER ...
	USER = "user"
	// HOST
	HOST = "http://192.168.1.7:8080"
)
