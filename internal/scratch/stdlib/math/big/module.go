package big

import (
	"context"
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("math/big", []unit.Unit{
	unit.NewUnit("export", func(ctx context.Context) error {
		i := big.NewInt(-12345)
		s := i.String()
		j, _ := json.Marshal(i)

		fmt.Printf("` %s `\n", s)
		fmt.Printf("` %s `\n", string(j))

		return nil
	}),
})
