package calculator

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAdd(t *testing.T) {
	t.Parallel()

	tt := []struct {
		left     int
		right    int
		expected int
	}{
		{1, 2, 3},
		{2, 3, 5},
		{-10, 37, 27},
		{9223372036854775807, 1, -9223372036854775808},
	}

	for _, tc := range tt {
		t.Run(fmt.Sprintf("%d + %d", tc.left, tc.right), func(t *testing.T) {
			t.Parallel()
			assert := assert.New(t)

			result := Add(tc.left, tc.right)
			assert.Equal(tc.expected, result)
		})
	}
}
