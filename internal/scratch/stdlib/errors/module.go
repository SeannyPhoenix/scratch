package errors

import (
	"context"

	"github.com/seannyphoenix/scratch/internal/scratch/stdlib/errors/errortype"
	"github.com/seannyphoenix/scratch/internal/scratch/stdlib/errors/errorvar"
	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("errors", []unit.Unit{
	unit.NewUnit("error type", func(ctx context.Context) error {
		errortype.Handle()
		return nil
	}),
	unit.NewUnit("error var", func(ctx context.Context) error {
		errorvar.Handle()
		return nil
	}),
})
