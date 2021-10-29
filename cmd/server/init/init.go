// main this file instantiates datas some thing that needs to be run before the server starts working.
package main

import (
	"context"

	"github.com/mabdela/mella-backend/pkg/constants/model"
	"github.com/mabdela/mella-backend/pkg/constants/state"
	"github.com/mabdela/mella-backend/pkg/storage/mongodb"
	"github.com/mabdela/mella-backend/platforms/helper"
	"github.com/subosito/gotenv"
)

func init() {
	gotenv.Load("../.env")
}

func main() {
	connect := mongodb.ConnectMongoDB()
	admin := &model.Admin{
		Email:      "samuaeladnew@gmail.com",
		Firstname:  "samuael",
		Lastname:   "adnew ",
		Password:   "$2a$10$TQW6xnGA6xntDzWU21fGg.7.ad8vgfWz7OYvQETIRD/BPrpuvUKvG",
		Superadmin: true,
	}

	insert, _ := connect.Collection(state.ADMINS).InsertOne(context.TODO(), admin.GetInsertAdmin())
	oidstring := helper.ObjectIDFromInsertResult(insert)
	admin.ID = oidstring

	print(string(helper.MarshalThis(admin)))

}
