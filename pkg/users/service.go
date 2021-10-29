package users

type IUserService interface {
}

type UserService struct {
	Repo IUserRepo
}

// Creates a new User service instance given User Repository Instance.
func NewUserService(repo IUserRepo) IUserService {
	return &UserService{repo}
}
