package time

import (
	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("time", []unit.Unit{
	timeUnit,
})
