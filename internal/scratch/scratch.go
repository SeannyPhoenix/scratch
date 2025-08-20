package scratch

import (
	"context"
	"fmt"

	"github.com/seannyphoenix/scratch/internal/scratch/other"
	"github.com/seannyphoenix/scratch/internal/scratch/stdlib"
	"github.com/seannyphoenix/scratch/pkg/module"
)

var groups = [][]module.Module{
	other.Modules,
	stdlib.Modules,
}

func RunModules(ctx context.Context) error {
	for _, group := range groups {
		for _, module := range group {
			fmt.Printf("+-----------------------\n| Running module: %s\n+-----------------------\n", module.Name)
			if err := module.Run(ctx); err != nil {
				return fmt.Errorf("module %s: %w", module.Name, err)
			}
			fmt.Println()
		}
	}

	return nil
}
