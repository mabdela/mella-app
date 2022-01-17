package model

type Outline struct {
	CourseId string   `json:"course_id"`
	Outline  []Topics `json:"outline"`
}

type Topics struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Priority int    `json:"priority"`
	Note     string `json:"note"`
	Path     string `json:"path"`
	Children []Topics
}
