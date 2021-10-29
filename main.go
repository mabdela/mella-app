package main

import (
	"os"

	"github.com/samuael/Project/RegistrationSystem/pkg/constants/model"
	"github.com/samuael/Project/RegistrationSystem/platforms/helper"
)

func main() {
	admin := &model.Admin{}
	address := &model.Address{}
	round := &model.Round{}
	payin := &model.PayIn{}
	payout := &model.PayOut{}
	student := &model.Student{}
	println(string(helper.MarshalThis(address))+"\n", string(helper.MarshalThis(payout))+"\n", string(helper.MarshalThis(payin))+"\n", string(helper.MarshalThis(student))+"\n", string(helper.MarshalThis(round))+"\n", "\n", string(helper.MarshalThis(admin))+"\n")
	password := "admin"
	auth, _ := helper.HashPassword(password)
	println(auth)

	println(os.Getenv("IPV4"))
}
