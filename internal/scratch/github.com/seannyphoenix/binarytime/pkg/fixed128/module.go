package fixed128

import (
	"context"

	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("fixed128", []unit.Unit{
	unit.NewUnit("export", func(ctx context.Context) error {
		return nil
	}),
})
