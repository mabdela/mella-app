package state

import "time"

var (
	// ImageExtensions list of valid image extensions
	ImageExtensions = []string{"jpeg", "png", "jpg", "gif", "btmp"}
)

const (
	// InvalidUsernameORPassword ...
	InvalidUsernameORPassword = " Invalid Username or Password "
	// InvalidEmailOrPassword
	InvalidEmailOrPassword = " Invalid email or password! "
	// SuccesfulyLoggedIn ...
	SuccesfulyLoggedIn = " Succesfuly Logged In "

	// This constant values listed below are roles of the system
	// those who directly interact with the system .

	SUPERADMIN = "superadmin"
	// ADMIN ...
	ADMIN = "admin"
	// USER ...
	USER = "user"
	// HOST
	HOST = "http://192.168.1.7:8080"

	// VALIE_SECRET_EMAIL_DURATION the duration value for secret email and a secret information in to to be valid.
	VALIE_SECRET_EMAIL_DURATION = time.Minute * 30
)

const (
	// ADMINS
	ADMINS = "admins"
	// COMMENTS ...
	COMMENTS = "comments"
	// COURSES  ... used for database collections.
	COURSES = "courses"
	// USER ...
	USERS = "users"
	// QUIZS
	QUIZS = "quizs"
	// QUIZINFOS ...
	QUIZINFOS = "quizinfos"
	// ARTICLES ... represents the articles name of collection.
	ARTICLES = "articles"
	// CHAPTER  .. represents the article 'chapter' instance.
	CHAPTER = "chapter"
)

const (
	// COURSE_IMAGES_PATH
	COURSE_IMAGES_RELATIVE_PATH = "images/course/"
	// PROFILE_IMAGES_RELATIVE_PATH ...
	PROFILE_IMAGES_RELATIVE_PATH = "images/profile/"
	// ARTICLE_IMAGES_RELATIVE_PATH  relative path to courses.
	ARTICLE_IMAGES_RELATIVE_PATH    = "images/articles/"
	SUBARTICLE_IMAGES_RELATIVE_PATH = "images/articles/subarticles/"
	ARTICLES_FILE_SIZE              = 999999999999999999
)

const (
	BAD_REQUEST_VALUES = iota
	OK
	NOT_FOUND
	QUERY_ERROR
	NO_SUBARTICLE_MODOFIED
	INTERNAL_SERVER_ERROR
	MISSING_INPUT_PARAMETER
	INVALID_MONGODB_OBJECT_ID
)

var STATUS_CODES = map[int]string{
	BAD_REQUEST_VALUES:        "bad request values ",
	OK:                        "ok",
	QUERY_ERROR:               "error while querying",
	NO_SUBARTICLE_MODOFIED:    "no sub article is nmodified",
	INTERNAL_SERVER_ERROR:     "internal server error",
	MISSING_INPUT_PARAMETER:   "missing input parameter",
	INVALID_MONGODB_OBJECT_ID: "invalid mongo database object id",
}
