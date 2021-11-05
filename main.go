package main

import (
	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/platforms/helper"
)

func main() {
	println(string(helper.MarshalThis(model.Admin{})) + "\n" + string(helper.MarshalThis(model.User{})) + "\n")
}
