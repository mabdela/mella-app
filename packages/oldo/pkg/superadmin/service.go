package superadmin

type ISuperadminService interface {
}

type SuperadminService struct {
}

func NewSuperadminService() ISuperadminService {
	return &SuperadminService{}
}
