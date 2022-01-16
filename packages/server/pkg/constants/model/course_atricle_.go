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
	InArticle struct {
		ID                string          `json:"id,omitempty"` // ID
		CourseID          string          `json:"course_id"`
		Title             string          `json:"title"` // Title
		TitleTranslation  string          `json:"title_translation"`
		Desc              []string        `json:"desc"` // Description  // this lisr of string represents a paragraphs in each article and sub articles.
		FigureDescription string          `json:"figure_desc,omitempty"`
		Figure            string          `json:"figure,omitempty"`
		Subarticles       []*InSubArticle `json:"sub_articles,omitempty"`
	}
	InSubArticle struct {
		Index                int      `bson:"index,omitempty" json:"index,omitempty"`
		Subtitle             string   `bson:"sub_title" json:"sub_title" `
		SubFigureDescription string   `json:"figure_desc,omitempty" `
		SubFigure            string   `bson:"figure,omitempty"   json:"figure,omitempty" `
		Datas                []string `bson:"datas" json:"datas" `
	}
)

// In this section Below , I have mentioned some functions to convert the input sub article instances to the sub article instances
// Therefore, this suba rticle sinstances can be inserted into the database.
func (inarticle *InArticle) ToArticle() *Article {
	return &Article{
		ID:               inarticle.ID,
		CourseID:         inarticle.CourseID,
		Title:            inarticle.Title,
		TitleTranslation: inarticle.TitleTranslation,
		Desc:             inarticle.Desc,
		Figure:           &ImageWithDescription{Description: inarticle.FigureDescription, Imageurl: inarticle.Figure},
		Subarticles:      GetSubArticles(inarticle.Subarticles),
	}
}

// change the input sub article into sub article instance so that that can be inserted into the database or returned to the users.
func GetSubArticles(insubarticles []*InSubArticle) []*SubArticle {
	subarticles := []*SubArticle{}
	for _, sub := range insubarticles {
		subarticles = append(subarticles, sub.ToSubArticle())
	}
	return subarticles
}
func (insarticle *InSubArticle) ToSubArticle() *SubArticle {
	return &SubArticle{
		Index:     insarticle.Index,
		Subtitle:  insarticle.Subtitle,
		SubFigure: &ImageWithDescription{Description: insarticle.SubFigureDescription, Imageurl: insarticle.SubFigure},
		Datas:     insarticle.Datas,
	}
}
