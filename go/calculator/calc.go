package calculator

func Add(left, right int) int {
	return left + right
}

func Subtract(left, right int) int {
	return left - right
}

func Multiply(left, right int) int {
	return left * right
}

func Divide(left, right int) (int, error) {
	if right == 0 {
		return 0, &divideByZeroError{}
	}
	return left / right, nil
}
