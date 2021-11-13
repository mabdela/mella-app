package model

type (
	// Quiz ...
	Topic struct {
		ID          string     `json:"id"`
		Title       string     `json:"title"`
		Description string     `json:"desc"`
		Questions   []Question `json:"questions"`
	}
	// Question representing a question for specific Quiz.
	Question struct {
		ID          string   `json:"id"`
		Index       uint     `json:"index"`
		TopicID     string   `json:"topic_id"` // this references the topic ID.
		Question    string   `json:"question"`
		Choice      []string `json:"choice"`
		Answer      uint     `json:"answer"`
		Explanation string   `json:"explanation"`
		Keyword     []string `json:"keyword"`
	}
)

