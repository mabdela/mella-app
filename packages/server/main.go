package main

import (
	"encoding/json"
	"time"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
)

var data = `{
	"id": "61e3fb9a2436acb12ac8e173",
	"course_id": "6186dc10c252a16864f82129",
	"title": "atoms",
	"title_translation": "",
	"desc": [
		"This article is about the yihe ye articlochu description yihonal jal aregagut ",
		"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
		"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
		"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
	],
	"figure": {
		"desc": "",
		"imgurl": "images/articles/QR1sqr7.png"
	},
	"sub_articles": [
		{
			"index": 1,
			"sub_title": " particles",
			"figure": {
				"desc": "",
				"imgurl": "images/articles/subarticles/DASIE3.JPG"
			},
			"datas": [
				"This article is about the yihe ye articlochu description yihonal jal aregagut ",
				"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
				"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
				"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
			]
		},
		{
			"index": 2,
			"sub_title": " particles",
			"figure": {
				"desc": "",
				"imgurl": "images/articles/subarticles/qXmxMH.jpg"
			},
			"datas": [
				"This article is about the yihe ye articlochu description yihonal jal aregagut ",
				"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
				"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
				"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
			]
		},
		{
			"index": 3,
			"sub_title": " particles",
			"figure": {
				"desc": "",
				"imgurl": "images/articles/subarticles/6dYZZJ.jpg"
			},
			"datas": [
				"This article is about the yihe ye articlochu description yihonal jal aregagut ",
				"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
				"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
				"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
			]
		}
	]
}`

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

	// val, _ := json.Marshal(&model.InArticle{ID: "s453453k4534"})
	// println(string(val))

	// val2, _ := json.Marshal(&model.Article{})
	// println(string(val2))

	// chapter := &model.Chapter{
	// 	ID:                    "k83405934805280",
	// 	CourseID:              "k83405934805280",
	// 	ChapterNumber:         1,
	// 	Title:                 "Kinematics of Particles",
	// 	CreatedAt:             time.Now(),
	// 	ArticlesCount:         1,
	// 	IntroductionArticleID: "61e3fb9a2436acb12ac8e173",
	// }

	// dec := json.NewDecoder(bytes.NewBuffer([]byte(data)))
	// article := &model.Article{}
	// er := dec.Decode(article)
	// if er != nil {
	// 	print(er.Error())
	// 	return
	// }
	// data, er := json.Marshal(chapter)
	// if er != nil {
	// 	return
	// }
	// // println(string(data))

	// chapterDetail := model.ChapterDetail{
	// 	Chapter: chapter,
	// 	Articles: []*model.ArticleOverview{
	// 		article.GetArticleOverview(),
	// 		article.GetArticleOverview(),
	// 		article.GetArticleOverview(),
	// 		article.GetArticleOverview(),
	// 	},
	// }
	// data, er = json.Marshal(chapterDetail)
	// if er != nil {
	// 	return
	// }
	// println(string(data))

	chapter := &model.Chapter{
		ID:                    "78979878",
		CourseID:              "hsdjkfh6482376",
		ArticlesCount:         5,
		ChapterNumber:         1,
		Title:                 "Introduction to Kinematics ",
		CreatedAt:             time.Now(),
		IntroductionArticleID: "5656yuiy8768^&676&",
	}
	val, _ := json.Marshal(chapter)
	println(string(val))
	// pfile := &model.PartFileHeader{}
	// bytona := bytes.NewBuffer([]byte(`{"Content-Disposition":["form-data; name=\"title\"; filename=\"task2.step2.png\""],"Content-Type":["multipart/form-data"]}`))
	// jdec := json.NewDecoder(bytona)
	// e := jdec.Decode(pfile)
	// if e != nil {
	// 	println("Error while decoding the file ")
	// 	return
	// }
	// println(string(helper.MarshalThis(pfile.ContentDisposition)))

	// pfile.Restructure()
	// println(string(helper.MarshalThis(pfile.ContentDisposition)))

	// println("File name ", pfile.GetFileName())
	// println("Name ", pfile.GetFileKeyName())
	// println("Content-Type ", pfile.GetContentType())
	// println(string(helper.MarshalThis(pfile)))

	// // --------------------------------------------------------------
	// jsonString := `{

	// 	"title" : "atoms",
	// 	"desc" : [
	// 		"This article is about the yihe ye articlochu description yihonal jal aregagut ",
	// 		"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
	// 		"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
	// 		"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
	// 		],
	// 	"course_id"  : "6186dc10c252a16864f82129",
	// 	"sub_articles": [
	// 			{
	// 				"index":1 ,
	// 				"sub_title" : " particles",
	// 				"sub_title_translation" : "la particle broda ",
	// 				"datas" : [
	// 					"This article is about the yihe ye articlochu description yihonal jal aregagut ",
	// 					"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
	// 					"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
	// 					"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
	// 					],
	// 			},
	// 			{
	// 				"index":2 ,
	// 				"sub_title" : " particles",
	// 				"sub_title_translation" : "la particle broda ",
	// 				"datas" : [
	// 					"This article is about the yihe ye articlochu description yihonal jal aregagut ",
	// 					"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
	// 					"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
	// 					"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
	// 					],
	// 			},
	// 			{
	// 				"index":3,
	// 				"sub_title" : " particles",
	// 				"sub_title_translation" : "la particle broda ",
	// 				"datas" : [
	// 					"This article is about the yihe ye articlochu description yihonal jal aregagut ",
	// 					"This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
	// 					"This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
	// 					"This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
	// 				],
	// 			}
	// 		]
	// 	}
	// 	`
	// article := &model.Article{}
	// jsonDecoder := json.NewDecoder(bytes.NewBuffer([]byte(jsonString)))
	// er := jsonDecoder.Decode(article)
	// if er != nil {
	// 	println("Error While Decoding ", er.Error())
	// 	return
	// }
	// println("\nJSON Decoded Succesfuly \n\n", string(helper.MarshalThis(article)))
}

/*
{
        "id": "61e3fb9a2436acb12ac8e173",
        "course_id": "6186dc10c252a16864f82129",
        "title": "atoms",
        "title_translation": "",
        "desc": [
            "This article is about the yihe ye articlochu description yihonal jal aregagut ",
            "This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
            "This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
            "This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
        ],
        "figure": {
            "desc": "",
            "imgurl": "images/articles/QR1sqr7.png"
        },
        "sub_articles": [
            {
                "index": 1,
                "sub_title": " particles",
                "figure": {
                    "desc": "",
                    "imgurl": "images/articles/subarticles/DASIE3.JPG"
                },
                "datas": [
                    "This article is about the yihe ye articlochu description yihonal jal aregagut ",
                    "This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
                    "This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
                    "This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
                ]
            },
            {
                "index": 2,
                "sub_title": " particles",
                "figure": {
                    "desc": "",
                    "imgurl": "images/articles/subarticles/qXmxMH.jpg"
                },
                "datas": [
                    "This article is about the yihe ye articlochu description yihonal jal aregagut ",
                    "This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
                    "This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
                    "This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
                ]
            },
            {
                "index": 3,
                "sub_title": " particles",
                "figure": {
                    "desc": "",
                    "imgurl": "images/articles/subarticles/6dYZZJ.jpg"
                },
                "datas": [
                    "This article is about the yihe ye articlochu description yihonal jal aregagut ",
                    "This sdfjadkfjis about the yihe ye articlochu description yihonal jal aregagut",
                    "This article sdflads about the yihe ye articlochu description yihonal jal aregagut ",
                    "This article is sdfakdfjalut the yihe ye articlochu description yihonal jal aregagut "
                ]
            }
        ]
    }
*/
