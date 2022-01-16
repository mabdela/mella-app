package model

type (
	Course struct {
		ID              string `json:"id,omitempty"`
		Title           string `json:"title"`
		TranslatedTitle string `json:"translated_title"`
		Imgurl          string `json:"imgurl,omitempty"`
		ArticleCount    int    `json:"article_count,omitempty"`
		CreatedBy       string `json:"created_by,omitempty"`
	}

	Article struct {
		ID          string            `json:"id,omitempty"` // ID
		CourseID    string            `bson:"course_id"`
		Title       string            `json:"title"` // Title
		Desc        map[string]string `json:"desc"`  // Description
		Image       string            `json:"imgurl,omitempty"`
		Subarticles []*SubArticle     `json:"sub_articles,omitempty"`
	}

	SubArticle struct {
		Index    int               `bson:"index,omitempty" json:"index,omitempty"`
		Subtitle string            `bson:"sub_title" json:"sub_title" `
		SubImage string            `bson:"sub_image,omitempty"  json:"sub_image,omitempty" `
		Datas    map[string]string `bson:"datas"  json:"datas" `
	}
)
