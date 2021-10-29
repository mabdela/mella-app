package contents

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mabdela/mella/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

//to load the json outline file
func loadOutlineJson() ([]byte, error) {

	pwd, err := os.Getwd()
	if err != nil {
		log.Println(err)
	}
	path := pwd + "\\english\\outline.json"

	jsonFile, err := os.Open(path)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	log.Println("Successfully opened outline.json")
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)

	return byteValue, nil
}

// Intentially did not add the file to the database
// For now just reading from the json file.
func GetOutline(c *gin.Context) {

	log.Println("Getting the outline")

	byteValue, err := loadOutlineJson()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": err.Error()})
		c.Abort()
		return
	}
	var outline models.Outline
	json.Unmarshal(byteValue, &outline)

	c.JSON(http.StatusOK, outline.Outline)

}

//to load the json questions file

func GetQuiz(c *gin.Context) {

	quiz_id := c.Param("quiz_id")

	log.Println("Getting Quiz with id: ", quiz_id)

	var quiz models.Questions
	var db = models.DB

	filter := bson.M{"topic_id": quiz_id}

	collection := db.Database("mella").Collection("quizes")

	count, err := collection.CountDocuments(context.Background(), filter)

	if err != nil {
		fmt.Println("error while finding the docment ", err.Error())
	}

	fmt.Println(count)
	if count >= 1 {
		fmt.Println("quiz with this id is allready in the database.........")
		err := collection.FindOne(context.Background(), bson.M{"topic_id": quiz_id}).Decode(&quiz)
		if err != nil {
			if strings.Contains(err.Error(), "no documents") { //if the error is related with document not found
				c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"msg": "server error"})
			}
			return
		}

	} else {
		fmt.Println("the quiz doesn't exist in the database.........")
		var path string

		switch quiz_id {
		case "101":
			path = "\\english\\grammar\\nouns\\quiz.json"
		case "102":
			path = "\\english\\grammar\\punctuations\\quiz.json"
		case "103":
			path = "\\english\\grammar\\voice\\quiz.json"
		case "104":
			path = "\\english\\grammar\\pronouns\\quiz.json"
		case "105":
			path = "\\english\\grammar\\comparison\\quiz.json"
		case "106":
			path = "\\english\\grammar\\vocabulary\\quiz.json"
		case "107":
			path = "\\english\\grammar\\adjectives\\quiz.json"
		case "108":
			path = "\\english\\grammar\\parts_of_sentence\\quiz.json"
		case "109":
			path = "\\english\\grammar\\verbs\\quiz.json"
		case "110":
			path = "\\english\\grammar\\phrases\\quiz.json"
		case "111":
			path = "\\english\\grammar\\tenses\\quiz.json"
		case "112":
			path = "\\english\\grammar\\clauses\\quiz.json"
		case "113":
			path = "\\english\\grammar\\adverbs\\quiz.json"
		case "114":
			path = "\\english\\grammar\\types_of_sentences\\quiz.json"
		case "115":
			path = "\\english\\grammar\\parts_of_speech\\quiz.json"
		case "116":
			path = "\\english\\grammar\\prepositions\\quiz.json"
		case "117":
			path = "\\english\\grammar\\question_tags\\quiz.json"
		case "118":
			path = "\\english\\grammar\\articles\\quiz.json"
		case "119":
			path = "\\english\\grammar\\conjections\\quiz.json"
		case "120":
			path = "\\english\\grammar\\direct_and_indirect_speech\\quiz.json"
		case "121":
			path = "\\english\\grammar\\interjections\\quiz.json"
		case "122":
			path = "\\english\\grammar\\formation_of_words\\quiz.json"
		case "123":
			path = "\\english\\grammar\\words_usage\\quiz.json"
		case "124":
			path = "\\english\\grammar\\conditional_clauses\\quiz.json"
		case "125":
			path = "\\english\\grammar\\infnitive_and_gerund\\quiz.json"

		case "201":
			path = "\\english\\grammar\\formal_letter_writing\\quiz.json"
		case "202":
			path = "\\english\\grammar\\precis_writing\\quiz.json"
		case "203":
			path = "\\english\\grammar\\notice_writing\\quiz.json"
		case "204":
			path = "\\english\\grammar\\diary_entry\\quiz.json"
		case "205":
			path = "\\english\\grammar\\message_writing\\quiz.json"
		case "206":
			path = "\\english\\grammar\\dialogue_writing\\quiz.json"
		case "207":
			path = "\\english\\grammar\\story_writing\\quiz.json"
		case "208":
			path = "\\english\\grammar\\reading_comprehension\\quiz.json"
		case "209":
			path = "\\english\\grammar\\paragraph_writing\\quiz.json"
		case "210":
			path = "\\english\\grammar\\informal_letter_writing\\quiz.json"
		case "211":
			path = "\\english\\grammar\\essay_writing\\quiz.json"

		default:
			{
				c.JSON(http.StatusNotFound, gin.H{"msg": "Not Found"})
				c.Abort()
				return
			}
		}

		pwd, err := os.Getwd()
		if err != nil {
			log.Println(err)
		}
		pwd = strings.TrimRight(pwd, "cmd")
		path = pwd + path

		jsonFile, err := os.Open(path)

		if err != nil {
			log.Println(err)

			c.JSON(http.StatusNotFound, gin.H{"msg": "Not found"})

			c.Abort()

			return

		}
		defer jsonFile.Close()
		log.Println("Successfully opened outline.json")

		byteValue, _ := ioutil.ReadAll(jsonFile)

		json.Unmarshal(byteValue, &quiz)

		_, err = collection.InsertOne(context.Background(), quiz)
		if err != nil {
			fmt.Println(err.Error())
		}
	}

	c.JSON(http.StatusOK, quiz.Questions)

}
