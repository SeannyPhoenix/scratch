package unit

import "context"

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
	return u.runner(ctx)
}
