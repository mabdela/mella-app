package course

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type ICourseService interface {
	// CreateCourse uses "course" *model.Course creates a course instance.
	CreateCourse(ctx context.Context) (*model.Course, error)
	// GetCourseByID  uses "course_id"   string to get a single course instance.
	GetCourseByID(ctx context.Context) (*model.Course, error)
	// UpdateCourse  uses "course" string to update a single course instance.
	UpdateCourse(ctx context.Context) (*model.Course, error)
	// ChangePicture uses "picture_url" string and "course_id"  string
	// to cahnge the picture representing the course
	ChangePicture(ctx context.Context) (string, error)
	// GetCourseImageByID users "course_id"  string
	GetCourseImageByID(ctx context.Context) (string, error)
}

type CourseService struct {
	Repo ICourseRepo
}

func NewCourseService(repo ICourseRepo) ICourseService {
	return &CourseService{
		Repo: repo,
	}
}

func (cser *CourseService) CreateCourse(ctx context.Context) (*model.Course, error) {
	return cser.Repo.CreateCourse(ctx)
}

func (cser *CourseService) GetCourseByID(ctx context.Context) (*model.Course, error) {
	return cser.Repo.GetCourseByID(ctx)
}

func (cser *CourseService) UpdateCourse(ctx context.Context) (*model.Course, error) {
	return cser.Repo.UpdateCourse(ctx)
}

func (cser *CourseService) ChangePicture(ctx context.Context) (string, error) {
	return cser.Repo.ChangePicture(ctx)
}
func (cser *CourseService) GetCourseImageByID(ctx context.Context) (string, error) {
	return cser.Repo.GetCourseImageByID(ctx)
}
