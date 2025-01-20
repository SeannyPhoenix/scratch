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

func TestSubtract(t *testing.T) {
	t.Parallel()

	tt := []struct {
		left     int
		right    int
		expected int
	}{
		{1, 2, -1},
		{234, 123, 111},
		{-10, -37, 27},
		{-9223372036854775808, 1, 9223372036854775807},
	}

	for _, tc := range tt {
		t.Run(fmt.Sprintf("%d - %d", tc.left, tc.right), func(t *testing.T) {
			t.Parallel()
			assert := assert.New(t)

			result := Subtract(tc.left, tc.right)
			assert.Equal(tc.expected, result)
		})
	}
}

func TestMultiply(t *testing.T) {
	t.Parallel()

	tt := []struct {
		left     int
		right    int
		expected int
	}{
		{1, 2, 2},
		{234, 123, 28782},
		{-10, -37, 370},
		{9223372036854775807, 2, -2},
	}

	for _, tc := range tt {
		t.Run(fmt.Sprintf("%d * %d", tc.left, tc.right), func(t *testing.T) {
			t.Parallel()
			assert := assert.New(t)

			result := Multiply(tc.left, tc.right)
			assert.Equal(tc.expected, result)
		})
	}
}

func TestDivide(t *testing.T) {
	t.Parallel()

	tt := []struct {
		left     int
		right    int
		expected int
		err      error
	}{
		{2, 1, 2, nil},
		{234, 123, 1, nil},
		{-10, -37, 0, nil},
		{9223372036854775807, 2, 4611686018427387903, nil},
		{1, 0, 0, &divideByZeroError{}},
	}

	for _, tc := range tt {
		t.Run(fmt.Sprintf("%d / %d", tc.left, tc.right), func(t *testing.T) {
			t.Parallel()
			assert := assert.New(t)

			result, err := Divide(tc.left, tc.right)

			if tc.err != nil {
				assert.Equal(tc.err, err)
			} else {
				assert.Nil(err)
			}
			assert.Equal(tc.expected, result)
		})
	}
}
