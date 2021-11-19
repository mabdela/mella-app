package model

type GoogleUser struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`

	Name       string `json:"name"`
	GivenName  string `json:"given_name"`
	FamilyName string `json:"family_name"`
	Link       string `json:"link"`
	Picture    string `json:"picture"`
}

type FacebookUser struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Firstname string `json:"first_name"`
	Lastname  string `json:"last_name"`
	Picture   string `json:"picture"`
	Name      string `json:"name"`
}

type FacebookUserInput struct {
	ID        string                      `json:"id"`
	Email     string                      `json:"email,omitempty"`
	Firstname string                      `json:"first_name,omitempty"`
	Lastname  string                      `json:"last_name,omitempty"`
	Picture   map[string]*FacebookPicture `json:"picture,omitempty"`
	Name      string                      `json:"name"`
}

type FacebookPicture struct {
	Height      int    `json:"height,omitempty"`
	IsSilhoutte string `json:"is_silhoutte,omitempty"`
	Url         string `json:"url,omitempty"`
	Width       int    `json:"width,omitempty"`
}

func (fui *FacebookUserInput) GetFacebookUser() *FacebookUser {
	picture := ""
	if data := fui.Picture["data"]; data != nil {
		picture = data.Url
	}
	return &FacebookUser{
		ID:        fui.ID,
		Email:     fui.Email,
		Firstname: fui.Firstname,
		Lastname:  fui.Lastname,
		Name:      fui.Name,
		Picture:   picture,
	}
}
