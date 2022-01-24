package model

type (
	// Quiz ...
	Topic struct {
		ID          string     `json:"id"`
		ArticleId   string     `json:"article_id"`
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

// type (
// 	// Quiz ...
// 	// In this case Topic is an equivalent of Quiz and it holds
// 	// the reference to the article on which the question is attached to.
// 	Topic struct {
// 		ID          string     `json:"id"`
// 		ArticleID   string     `json:"article_id"`
// 		Title       string     `json:"title"`
// 		Description string     `json:"desc"`
// 		Questions   []Question `json:"questions"`
// 	}

// 	Question struct {
// 		Index       uint                `json:"index"`
// 		Question    string              `json:"question"`
// 		Choice      []string            `json:"choice"`
// 		Answer      uint                 `json:"answer"`
// 		Explanation string              `json:"explanation"`
// 		Keywords    []map[string]string `json:"keywords"`
// 	}
// )
