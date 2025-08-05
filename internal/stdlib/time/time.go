package time

import (
	"context"

	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("time", Run)

var units = []unit.Unit{}

func Run(ctx context.Context) error {
	for _, u := range units {
		if err := u.Run(ctx); err != nil {
			return err
		}
	}
	return nil
}
