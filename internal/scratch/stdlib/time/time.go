package time

import (
	"context"
	"fmt"
	"time"

	"github.com/seannyphoenix/scratch/pkg/unit"
)

var timeUnit = unit.NewUnit("time", func(ctx context.Context) error {
	t := time.Now()
	fmt.Println(t)

	return nil
})
