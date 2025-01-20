package calculator

func add(left, right int) int {
	return left + right
}

func subtract(left, right int) int {
	return left - right
}

func multiply(left, right int) int {
	return left * right
}

func divide(left, right int) (int, error) {
	if right == 0 {
		return 0, &divideByZeroError{}
	}
	return left / right, nil
}
