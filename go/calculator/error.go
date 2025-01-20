package calculator

type divideByZeroError struct{}

func (e *divideByZeroError) Error() string {
	return "cannot divide by zero"
}
