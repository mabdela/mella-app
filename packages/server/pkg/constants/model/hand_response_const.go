// Package model ...
// this model file  holds structs that are to be used by the admin handler.
package model

import "mime/multipart"

// AdminLoginResponse to be usedby the admin response class
type AdminLoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Admin   *Admin `json:"admin"`
}

// LoginResponse to be usedby the admin response class
type LoginResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	User    interface{} `json:"user"`
}

// CreateUserResponse ...
type CreateUser struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// SimpleSuccessNotifier ...
type SimpleSuccessNotifier struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
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

type MultipartData struct {
	File   multipart.File
	Header *multipart.FileHeader
	Error  error
}

type AllUsersReponse struct {
	Success  bool    `json:"success"`
	Message  string  `json:"msg"`
	UserList []*User `json:"user"`
}

type UserResponse struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
	User    *User
}

type AdminResponse struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
	Admin   *Admin
}
type MoreThanOneAdminResponse struct {
	Success bool   `json:"success"`
	Message string `json:"msg"`
	Admin   []*Admin
}
