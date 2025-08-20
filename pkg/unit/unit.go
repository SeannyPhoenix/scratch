package unit

import (
	"context"
	"fmt"
)

type Unit struct {
	Name   string
	runner func(context.Context) error
}

func NewUnit(name string, runner func(context.Context) error) Unit {
	return Unit{
		Name:   name,
		runner: runner,
	}
}

func (u Unit) Run(ctx context.Context) error {
	if u.runner == nil {
		return nil
	}

	error := u.runner(ctx)
	if error != nil {
		return fmt.Errorf("unit %s: %w", u.Name, error)
	}

	return nil
}
