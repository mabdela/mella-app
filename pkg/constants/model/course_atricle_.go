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
		ID          string       `json:"id,omitempty"` // ID
		CourseID    string       `bson:"course_id"`
		Title       string       `json:"title"` // Title
		Desc        string       `json:"desc"`  // Description
		Image       string       `json:"imgage"`
		Subarticles []SubArticle `json:"sub_articles"`
	}

	SubArticle struct {
		Index    int               `json:"index"`
		Subtitle string            `json:"sub_title"`
		SubImage string            `json:"sub_image"`
		Datas    map[string]string `json:"datas"`
	}
)
