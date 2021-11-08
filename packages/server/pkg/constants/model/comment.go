package model

import "time"

type (
	Comment struct {
		ID      string    `json:"id"` // this is string
		Content string    `json:"content"`
		UserID  string    `json:"user_id"`
		TopicID string    `json:"topic_id"`
		Likes   []string  `json:"likes"`
		Date    time.Time `json:"date"`
	}
)
