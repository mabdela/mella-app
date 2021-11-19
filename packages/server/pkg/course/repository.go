package course

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type ICourseRepo interface {
	CreateCourse(ctx context.Context) (*model.Course, error)
	GetCourseByID(ctx context.Context) (*model.Course, error)
	UpdateCourse(ctx context.Context) (*model.Course, error)
	ChangePicture(ctx context.Context) (string, error)
	GetCourseImageByID(ctx context.Context) (string, error)
	RemoveCourse(ctx context.Context) (bool, error)
	GetAllCourses(ctx context.Context) ([]*model.Course, error)
}
