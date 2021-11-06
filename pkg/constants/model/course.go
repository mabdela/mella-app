package model

type Course struct {
	CourseId      string `json:"course_id"`
	Title         string `json:"title"`
	Translation   string `json:"title_translation"`
	ArticlesCount int    `json:"articles_count"`
	CreatedBy     string `json:"created_by"`
}

type Articles struct {
	CourseId    string `json:"course_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Subarticles []Subarticles
}
type Subarticles struct {
	Index    int    `json:"index"`
	Subtitle string `json:"subtitle"`
	Subimage string `json:"subimage"`
	Data     map[string]string
}
