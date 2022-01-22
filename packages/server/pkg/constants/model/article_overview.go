package model

type ArticleOverview struct {
	ID               string `json:"id,omitempty"` // ID
	CourseID         string `json:"course_id"`
	Title            string `json:"title"` // Title
	TitleTranslation string `json:"title_translation"`
	// The Description here is a single string representing a sentence which can be shown as a short description for serching the article.
	Desc string `json:"desc"`
}

// GetArticleOverview returns an article overview instance given an article.
func (article *Article) GetArticleOverview() *ArticleOverview {
	articleOverview := &ArticleOverview{
		ID:       article.ID,
		CourseID: article.CourseID,
		Title:    article.Title,
		// TitleTranslation: article.TitleTranslation,
		//: article.ID  ,
	}
	if len(article.Desc) > 0 {
		articleOverview.Desc = article.Desc[0]
	} else {
		articleOverview.Desc = "... "
	}
	return articleOverview
}
