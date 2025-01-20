package calculator

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDivideByZeroError(t *testing.T) {
	t.Parallel()
	assert := assert.New(t)

	err := &divideByZeroError{}

	assert.Equal("cannot divide by zero", err.Error())
}
