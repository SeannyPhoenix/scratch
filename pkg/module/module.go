package module

import (
	"context"
	"fmt"

	"github.com/seannyphoenix/scratch/pkg/unit"
)

type Module struct {
	Name string

	units []unit.Unit
}

func NewModule(name string, units []unit.Unit) Module {
	return Module{
		Name:  name,
		units: units,
	}
}

func (m *Module) Run(ctx context.Context) error {
	for _, u := range m.units {
		fmt.Printf("Running unit: %s\n", u.Name)
		if err := u.Run(ctx); err != nil {
			return err
		}
		fmt.Println()
	}

	return nil
}
