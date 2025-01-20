package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/seannyphoenix/scratch/go/calculator"
)

func main() {
	args := os.Args[1:]

	if len(args) != 3 {
		fmt.Println("Usage: calculator <operation> <left> <right>")
		os.Exit(1)
	}

	operation := args[0]
	left, err := strconv.Atoi(args[1])
	if err != nil {
		fmt.Printf("Invalid left operand: %s\n", args[1])
		os.Exit(1)
	}
	right, err := strconv.Atoi(args[2])
	if err != nil {
		fmt.Printf("Invalid right operand: %s\n", args[2])
		os.Exit(1)
	}

	switch operation {
	case "add":
		result := calculator.Add(left, right)
		fmt.Printf("%d + %d = %d\n", left, right, result)
	case "subtract":
		result := calculator.Subtract(left, right)
		fmt.Printf("%d - %d = %d\n", left, right, result)
	case "multiply":
		result := calculator.Multiply(left, right)
		fmt.Printf("%d * %d = %d\n", left, right, result)
	case "divide":
		result, err := calculator.Divide(left, right)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		fmt.Printf("%d / %d = %d\n", left, right, result)
	default:
		fmt.Println("Invalid operation")
		os.Exit(1)
	}
}
