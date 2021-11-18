package main

import (
	"bytes"
	"encoding/json"

	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/platforms/helper"
)

func main() {
	// println(string(helper.MarshalThis(&struct {
	// 	Firstname  string `json:"firstname"`
	// 	Lastname   string `json:"lastname"`
	// 	Email      string `json:"email"`
	// 	Superadmin bool   `json:"superadmin"`
	// }{}))+
	// 	"\n\n\n\n"+
	// 	string(
	// 		helper.MarshalThis(
	// 			&model.LoginResponse{
	// 				false,
	// 				"bad request body  ",
	// 				nil,
	// 			})),
	// 			string(
	// 				helper.MarshalThis(
	// 					&model.Admin{
	// 						ID: "sdfjkadj",
	// 						Email: "someone@gmail.com",
	// 						Firstname: "abebe",
	// 						Lastname: "Kebede",
	// 						Imgurl: "/image/profile/abcdef.jpg",
	// 						Superadmin: false,
	// 						Password: "",
	// 					},),),)

	pfile := &model.PartFileHeader{}
	bytona := bytes.NewBuffer([]byte(`{"Content-Disposition":["form-data; name=\"title\"; filename=\"task2.step2.png\""],"Content-Type":["multipart/form-data"]}`))
	jdec := json.NewDecoder(bytona)
	e := jdec.Decode(pfile)
	if e != nil {
		println("Error while decoding the file ")
		return
	}
	println(string(helper.MarshalThis(pfile.ContentDisposition)))

	pfile.Restructure()
	println(string(helper.MarshalThis(pfile.ContentDisposition)))

	println("File name ", pfile.GetFileName())
	println("Name ", pfile.GetFileKeyName())
	println("Content-Type ", pfile.GetContentType())
	println(string(helper.MarshalThis(pfile)))
}
