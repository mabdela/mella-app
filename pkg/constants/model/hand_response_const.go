// Package model ...
// this model file  holds structs that are to be used by the admin handler.
package model

// AdminLoginResponse to be usedby the admin response class
type AdminLoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
	Admin   *Admin `json:"admin"`
}

// LoginResponse to be usedby the admin response class
type LoginResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"msg"`
	User    interface{} `json:"user"`
}

// CreateUserResponse ...
type CreateUser struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
}

// SimpleSuccessNotifier ...
type SimpleSuccessNotifier struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
}

// ShortSuccess
type ShortSuccess struct {
	Msg string `json:"msg"`
}

type CommentRes struct {
	Success  bool      `success`
	Message  string    `msg`
	Comments []Comment //to be changed to commentResponse
}

type CourseRes struct {
	Success bool   `success`
	Message string `msg`
	Courses []Course
}
type AllUsersReponse struct {
	Success  bool    `json:"success"`
	Message  string  `json:"msg"`
	UserList []*User `json:"user"`
}

//new
type UserResponse struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
	User    *User
}
