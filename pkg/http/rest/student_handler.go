package rest

// IStudentHandler  ....
type IStudentHandler interface {
}

// StudentHandler struct representing.
type StudentHandler struct {
}

// NewStudentHandler creates a new student handler function.
func NewStudentHandler() IStudentHandler {
	return &StudentHandler{}
}
