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

	// --------------------------------------------------------------
	jsonString := `{
 
		"title" : "atoms",
		"desc" : [
			{"key":"This article is about the " ,       "value" :"yihe ye articlochu description yihonal jal aregagut "},
			{"key":"This sdfjadkfjis about the ",       "value" :"yihe ye articlochu description yihonal jal aregagut "},
			{"key":"This article sdflads about the " ,  "value" :"yihe ye articlochu description yihonal jal aregagut "},
			{"key":"This article is sdfakdfjalut the ", "value" :"yihe ye articlochu description yihonal jal aregagut "}
			],
		"course_id"  : "6186dc10c252a16864f82129",
		"sub_articles": [
				{
					"index":1 , 
					"sub_title" : " particles",
					"sub_title_translation" : "la particle broda ",
					"datas" : [
						{"key":"This article is about the " ,       "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This sdfjadkfjis about the ",       "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This article sdflads about the " ,  "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This article is sdfakdfjalut the ", "value" :"yihe ye articlochu description yihonal jal aregagut "}
					]
				},
				{
					"index":2 , 
					"sub_title" : " particles",
					"sub_title_translation" : "la particle broda ",
					"datas" : [
						{"key":"This article is about the " ,       "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This sdfjadkfjis about the ",       "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This article sdflads about the " ,  "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This article is sdfakdfjalut the ", "value" :"yihe ye articlochu description yihonal jal aregagut "}
					]
				},
				{
					"index":3, 
					"sub_title" : " particles",
					"sub_title_translation" : "la particle broda ",
					"datas" : [
						{"key":"This article is about the " ,       "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This sdfjadkfjis about the ",       "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This article sdflads about the " ,  "value" :"yihe ye articlochu description yihonal jal aregagut "},
						{"key":"This article is sdfakdfjalut the ", "value" :"yihe ye articlochu description yihonal jal aregagut "}
					]
				}
			]
		}
		`
	article := &model.Article{}
	jsonDecoder := json.NewDecoder(bytes.NewBuffer([]byte(jsonString)))
	er := jsonDecoder.Decode(article)
	if er != nil {
		println("Error While Decoding ", er.Error())
		return
	}
	println("\nJSON Decoded Succesfuly \n\n", string(helper.MarshalThis(article)))
}
