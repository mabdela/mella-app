package course

type ICourseService interface {
}

type CourseService struct {
}

func NewCourseService() ICourseService {
	return &CourseService{}
}
