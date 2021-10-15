package admin

import "golang.org/x/crypto/bcrypt"

type AdminModel struct {
	Email     string `json:"email" bson:"email"`
	Username  string `username:"email" bson:"username"`
	Password  string `json:"password" bson:"password"`
	FirstName string `json:"firstname" bson:"firstname"`
	LastName  string `json:"lastname" bson:"lastname"`
}

func (adminModel *AdminModel) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		return err
	}

	adminModel.Password = string(bytes)
	return nil
}

func (adminModel *AdminModel) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(adminModel.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}
