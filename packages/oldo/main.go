package main

import (
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

	println(string(helper.MarshalThis(&model.Article{Subarticles: []*model.SubArticle{&model.SubArticle{
		Index:    1,
		Subtitle: "the sub title",
		SubImage: "image/sub/article/new.png",
		Datas:    map[string]string{"some": "The Some ", "somel": "The Some ", "somh": "The Some ", "someb": "The Some ", "somec": "The Some "},
	}}})))

}

/*

	{
		"CourseID":"",
		"title":"",
		"desc":"",
		"imgage":"",
		"sub_articles":
			[
				{
					"index":1,
					"sub_title":"the sub title",
					"sub_image":"image/sub/article/new.png",
					"datas":{
						"some":"The Some ",
						"someb":"The Some ",
						"somec":"The Some ",
						"somel":"The Some ",
						"somh":"The Some "
						}
					}
				]
	}

*/
