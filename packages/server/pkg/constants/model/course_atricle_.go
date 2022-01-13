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
		ID               string                `json:"id,omitempty"` // ID
		CourseID         string                `json:"course_id"`
		Title            string                `json:"title"` // Title
		TitleTranslation string                `json:"title_translation"`
		Desc             []string              `json:"desc"` // Description  // this lisr of string represents a paragraphs in each article and sub articles.
		Figure           *ImageWithDescription `json:"figure,omitempty"`
		Subarticles      []*SubArticle         `json:"sub_articles,omitempty"`
	}
	SubArticle struct {
		Index     int                   `bson:"index,omitempty" json:"index,omitempty"`
		Subtitle  string                `bson:"sub_title" json:"sub_title" `
		SubFigure *ImageWithDescription `bson:"figure,omitempty"   json:"figure,omitempty" `
		Datas     []string              `bson:"datas" json:"datas" `
	}
	Desc struct {
		Key   string `json:"key"`
		Value string `json:"value"`
	}

	ImageWithDescription struct {
		Description string `json:"desc"`
		Imageurl    string `json:"imgurl"`
	}
)
