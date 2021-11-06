package main

import (
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/platforms/helper"
)

func main() {
	println(string(helper.MarshalThis(&struct {
		Firstname  string `json:"firstname"`
		Lastname   string `json:"lastname"`
		Email      string `json:"email"`
		Superadmin bool   `json:"superadmin"`
	}{}))+
		"\n\n\n\n"+
		string(
			helper.MarshalThis(
				&model.LoginResponse{
					false,
					"bad request body  ",
					nil,
				})), 
				string(
					helper.MarshalThis(
						&model.Admin{
							ID: "sdfjkadj",
							Email: "someone@gmail.com", 
							Firstname: "abebe",
							Lastname: "Kebede", 
							Imgurl: "/image/profile/abcdef.jpg", 
							Superadmin: false, 
							Password: "",
						},),),)


}
