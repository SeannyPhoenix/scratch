package types

import "github.com/google/uuid"

type Base struct {
	Id          uuid.UUID
	Description string
}

func (b Base) GetId() uuid.UUID {
	return b.Id
}

type One struct {
	Base

	Id string
}

func (o One) GetId() string {
	return o.Id
}
