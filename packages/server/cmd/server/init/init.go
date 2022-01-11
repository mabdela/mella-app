// main this file instantiates datas some thing that needs to be run before the server starts working.
package main

import (
	"context"

	"github.com/mabdela/mella-app/packages/server/pkg/constants/model"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/model/mongo_models"
	"github.com/mabdela/mella-app/packages/server/pkg/constants/state"
	"github.com/mabdela/mella-app/packages/server/pkg/storage/mongodb"
	"github.com/mabdela/mella-app/packages/server/platforms/helper"
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
	adminInsert := mongo_models.GetMAdmin(admin)
	insert, _ := connect.Collection(state.ADMINS).InsertOne(context.TODO(), adminInsert)
	oidstring := helper.ObjectIDFromInsertResult(insert)
	admin.ID = oidstring

	print(string(helper.MarshalThis(admin)))

}
