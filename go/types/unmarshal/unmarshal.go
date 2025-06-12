package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	a()
}

func a() {
	var x any

	data := `
{
	"one": 1,
	"two": {
		"three": 3
	},
	"four": [4, 5, 6]
}`
	if err := json.Unmarshal([]byte(data), &x); err != nil {
		panic(err)
	}

	fmt.Printf("%T: %v\n", x, x)
}
