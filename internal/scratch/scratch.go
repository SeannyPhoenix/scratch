package scratch

import (
	"context"
	"fmt"

	"github.com/seannyphoenix/scratch/internal/stdlib/log/slog"
	"github.com/seannyphoenix/scratch/internal/stdlib/time"
	"github.com/seannyphoenix/scratch/pkg/module"
)

var modules = []module.Module{
	slog.Module,
	time.Module,
}

func RunModules(ctx context.Context) error {
	for _, module := range modules {
		fmt.Printf("+-----------------------\n| Running module: %s\n+-----------------------\n", module.Name)
		if err := module.Run(ctx); err != nil {
			return err
		}
		fmt.Println()
	}

	return nil
}
