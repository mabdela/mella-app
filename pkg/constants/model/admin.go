package model

type (
	Admin struct {
		ID         string `json:"id"  bson:"_id"`
		Email      string `json:"email"`
		Firstname  string `json:"first_name"`
		Lastname   string `json:"last_name"`
		Imgurl     string `json:"imgurl"`
		Password   string `json:"password"`
		Superadmin bool   `json:"superadmin"`
	}
)
