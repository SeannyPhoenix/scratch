package module

import "context"

type Module struct {
	Name string

	runner func(context.Context) error
}

func NewModule(name string, runner func(context.Context) error) Module {
	return Module{
		Name:   name,
		runner: runner,
	}
}

func (m *Module) Run(ctx context.Context) error {
	if m.runner == nil {
		return nil
	}

	return m.runner(ctx)
}
