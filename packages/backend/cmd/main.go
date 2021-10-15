package main

import (
	"fmt"

	"github.com/mabdela/mella/pkg/models"
	"github.com/mabdela/mella/pkg/utils"
)

func main() {

	err := models.InitDatabase()
	fmt.Println("database connection error ", err)
	fmt.Println("Distributed Chat App v0.01")

	r := utils.SetupRouter()
	r.Run(":8080")

}
