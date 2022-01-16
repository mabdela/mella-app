package helper

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func DownloadResource(resourceUrl, destination, fileExtention string) (string, error) {
	randomName := GenerateRandomString(10, CHARACTERS)

	response, era := http.Get(resourceUrl)
	if era != nil {
		return "", era
	}
	println(response.StatusCode)

	println(string(MarshalThis(response.Header)))

	body := response.Body

	if response.StatusCode != 200 {
		return "", fmt.Errorf("error with status code %d", response.StatusCode)
	}

	file, er := os.Create(destination + randomName + "." + fileExtention)
	if er != nil {
		return "", er
	}
	defer file.Close()
	_, er = io.Copy(file, body)
	if er != nil {
		return "", er
	}
	return randomName + "." + fileExtention, nil
}
