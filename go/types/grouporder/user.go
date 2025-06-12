package grouporderuser

type Invited struct {
	Email Email
}

type Upgraded struct {
	UserID Id
}

type Revoked struct {
	UserID Id
}

type RevokedEmail struct {
	Email Email
}

type Expired struct {
	
}

// NOT RECOMMENDED, only for demo purposes
type Email string
type Id int