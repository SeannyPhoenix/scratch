package calculator

import "errors"

var add = operation{
	op: func(args ...float64) (float64, error) {
		if len(args) != 2 {
			return 0, errors.New("add operation requires exactly two arguments")
		}

		return args[0] + args[1], nil
	},
	argCount: 2,
}

var subtract = operation{
	op: func(args ...float64) (float64, error) {
		if len(args) != 2 {
			return 0, errors.New("subtract operation requires exactly two arguments")
		}

		return args[0] - args[1], nil
	},
	argCount: 2,
}

var multiply = operation{
	op: func(args ...float64) (float64, error) {
		if len(args) != 2 {
			return 0, errors.New("multiply operation requires exactly two arguments")
		}

		return args[0] * args[1], nil
	},
	argCount: 2,
}

var divide = operation{
	op: func(args ...float64) (float64, error) {
		if len(args) != 2 {
			return 0, errors.New("divide operation requires exactly two arguments")
		}
		if args[1] == 0 {
			return 0, errors.New("cannot divide by zero")
		}

		return args[0] / args[1], nil
	},
	argCount: 2,
}

var negate = operation{
	op: func(args ...float64) (float64, error) {
		if len(args) != 1 {
			return 0, errors.New("negate operation requires exactly one argument")
		}

		return -args[0], nil
	},
	argCount: 1,
}

type operation struct {
	op       func(args ...float64) (float64, error)
	argCount int
}

var operations = map[string]operation{
	"add":      add,
	"+":        add,
	"subtract": subtract,
	"sub":      subtract,
	"-":        subtract,
	"multiply": multiply,
	"mul":      multiply,
	"*":        multiply,
	"divide":   divide,
	"div":      divide,
	"/":        divide,
}
