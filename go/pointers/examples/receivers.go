package examples

import (
	"fmt"

	"github.com/google/uuid"
)

type data struct {
	id   uuid.UUID
	fact string
}

func (d data) valueNoChange(fact string) {
	d = data{uuid.New(), fact}
}

func (d *data) pointerNoReplace(fact string) {
	d = &data{uuid.New(), fact}
}

func (d data) valueReturnNew(fact string) data {
	return data{uuid.New(), fact}
}

func DoExamples() {
	var d1 data
	fmt.Printf("d1: %v\n", d1)
	d1.valueNoChange("This is the first sentence.")
	fmt.Printf("d1: %v\n", d1)

	var d2 *data
	fmt.Printf("d2: %v\n", d2)
	d2.pointerNoReplace("This is the second sentence.")
	fmt.Printf("d2: %v\n", d2)

	var d3 data
	fmt.Printf("d3: %v\n", d3.id)
	d3 = d3.valueReturnNew("This is the third sentence")
	fmt.Printf("d3: %v\n", d3.id)
}
