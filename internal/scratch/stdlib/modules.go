package stdlib

import (
	"github.com/seannyphoenix/scratch/internal/scratch/stdlib/errors"
	"github.com/seannyphoenix/scratch/pkg/module"
)

var Modules = []module.Module{
	// slog.Module,
	// time.Module,
	// big.Module,
	errors.Module,
}
