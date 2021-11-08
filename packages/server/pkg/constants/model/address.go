package model

// Address ...
type Address struct {
	ID                uint   `json:"id"`
	City              string `json:"city"`
	Region            string `json:"region"`
	Zone              string `json:"zone"`
	Woreda            string `json:"woreda"`
	Kebele            string `json:"kebele"`
	UniqueAddressName string `json:"unique_address_name"`
}
