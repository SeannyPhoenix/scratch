package binary

import (
	"fmt"
	"strings"

	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("other/binary", []unit.Unit{
	// unit.NewUnit("uint8", func(ctx context.Context) error {
	// 	var u uint8
	// 	for i := 0; i < 256; i++ {
	// 		u = uint8(i)
	// 		fmt.Printf("uint8(%3d) = %08b\n", u, u)
	// 	}
	// 	return nil
	// }),

	// unit.NewUnit("uint8 bitshift", func(ctx context.Context) error {
	// 	var u uint8 = 1
	// 	for i := 0; i < 8; i++ {
	// 		fmt.Printf("uint8(%3d) = %08b\n", u, u)
	// 		u <<= 1
	// 	}
	// 	return nil
	// }),

	// unit.NewUnit("uint8 bitshift", func(ctx context.Context) error {
	// 	var u uint8 = 0xFF
	// 	for i := 0; i < 8; i++ {
	// 		fmt.Printf("uint8(%3d) = %08b\n", u, u)
	// 		u >>= 1
	// 	}
	// 	return nil
	// }),

	// unit.NewUnit("uint8 to int8", func(ctx context.Context) error {
	// 	for i := 0x00; i <= 0xFF; i++ {
	// 		var u uint8 = uint8(i)
	// 		var s int8 = int8(u)
	// 		fmt.Printf("uint8(%3d) = %08b, int8(%3d) = %08b\n", u, u, s, s)
	// 	}

	// 	return nil
	// }),

	// unit.NewUnit("int8 to uint8", func(ctx context.Context) error {
	// 	for i := -0x80; i <= 0x7F; i++ {
	// 		var s int8 = int8(i)
	// 		var u uint8 = uint8(s)
	// 		fmt.Printf("int8(%3d) = %08b, uint8(%3d) = %08b\n", s, s, u, u)
	// 	}

	// 	return nil
	// }),

	// unit.NewUnit("uint8 - uint8", func(ctx context.Context) error {
	// 	// open a file for writing
	// 	out, err := os.OpenFile("binary.txt", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	// 	if err != nil {
	// 		return fmt.Errorf("failed to open file: %w", err)
	// 	}

	// 	for i := range 0xFF + 1 {
	// 		for j := range 0xFF + 1 {
	// 			var ui uint8 = uint8(i)
	// 			var uj uint8 = uint8(j)
	// 			uk := ui - uj
	// 			// fmt.Printf("%08b - %08b = %08b\n", ui, uj, uk)
	// 			// fmt.Printf("%8d - %8d = %8d\n", ui, uj, uk)
	// 			if _, err := fmt.Fprintf(out, "'%08b\t-\t'%08b\t'=\t'%08b\n%8d\t-\t%8d\t'=\t%8d\n\n", ui, uj, uk, ui, uj, uk); err != nil {
	// 				return fmt.Errorf("failed to write to file: %w", err)
	// 			}
	// 		}
	// 	}
	// 	return nil
	// }),

	// unit.NewUnit("normalize int8", func(ctx context.Context) error {
	// 	out, err := os.OpenFile("normalize.txt", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	// 	if err != nil {
	// 		return fmt.Errorf("failed to open file: %w", err)
	// 	}

	// 	i := int8(math.MinInt8)
	// 	for {
	// 		fmt.Fprintf(out, "Normalize:\n%s\n", normalize(i))

	// 		if i == math.MaxInt8 {
	// 			break
	// 		}
	// 		i++
	// 	}
	// 	return nil
	// }),

	// unit.NewUnit("subtracting uint8s", func(ctx context.Context) error {
	// 	i := uint8(6)
	// 	for j := uint8(0); j < 15; j++ {
	// 		fmt.Printf("%08b - %08b = %08b\n", i, j, i-j)
	// 	}

	// 	b := i - 255
	// 	fmt.Printf("%08b - %08b = %08b\n", i, 255, b)

	// 	return nil
	// }),

	// unit.NewUnit("subtracting int8s", func(ctx context.Context) error {
	// 	i := int8(6)
	// 	for j := int8(0); j < 15; j++ {
	// 		fmt.Printf("%08b - %08b = %08b: %08b\n", i, j, i-j, uint8(i-j))
	// 	}

	// 	return nil
	// }),
})

func normalize(v int8) string {
	out := line([]string{"v:", "int8", "", bitsInt8(v), decInt8(v)})

	uv := uint8(v)
	out += line([]string{"uv:", "uint8", "uint8(v)", bitsUint8(uv), decUint8(uv)})

	a := v >> 7
	out += line([]string{"a:", "int8", "v >> 7", bitsInt8(a), decInt8(a)})

	mask := uint8(a)
	out += line([]string{"mask:", "uint8", "uint8(a)", bitsUint8(mask), decUint8(mask)})

	b := uv ^ mask
	out += line([]string{"b:", "uint8", "uv ^ mask", bitsUint8(b), decUint8(b)})

	abs := b - mask
	out += line([]string{"abs:", "uint8", "b - mask", bitsUint8(abs), decUint8(abs)})

	neg := mask != 0
	out += line([]string{"neg:", "bool", "mask != 0", fmt.Sprintf("%t", neg)})

	return out
}

func line(m []string) string {
	return "\t" + strings.Join(m, "\t") + "\n"
}

func bitsInt8(v int8) string {
	return fmt.Sprintf("'%08b", uint8(v))
}

func bitsUint8(v uint8) string {
	return fmt.Sprintf("'%08b", v)
}

func decInt8(v int8) string {
	return fmt.Sprintf("'%0d", v)
}

func decUint8(v uint8) string {
	return fmt.Sprintf("'%0d", v)
}
