// main this file instantiates datas some thing that needs to be run before the server starts working.
package main

import (
	"github.com/subosito/gotenv"
)

func init() {
	gotenv.Load("../.env")
}

func main() {

}
