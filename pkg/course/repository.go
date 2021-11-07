package course

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
)

type ICourseRepo interface {
	CreateCourse(ctx context.Context) (*model.Course, error)
	GetCourseByID(ctx context.Context) (*model.Course, error)
	UpdateCourse(ctx context.Context) (*model.Course, error)
	RemoveCourse(ctx context.Context) (bool, error)
}
