package model

type (
	// QuizInfo this topic info holds all the information about the result of
	// a specific user and its score in those topics.
	// -----------------
	QuizInfo struct {
		ID      string `json:"id"`
		UserID  string `json:"user_id"`
		TopicID string `json:"topic_id"`
		Infos   []Info `json:"infos"`
	}
	// Info ... i have used choice index and question index because this
	// two variables are enough to get the data what we want.
	// if we wanted to know that whether this QUestion is answered or
	//  not just check  the Choice Index only , if it's greater than -1 then it is answered.
	// and if we want th check the correctness of the answer,
	// just compare the question Answer Index and Choice Index .
	Info struct {
		ChoiceIndex   int  `json:"choice_index"` // -1 by default.
		QuestionIndex uint `json:"question_index"`
	}
)
