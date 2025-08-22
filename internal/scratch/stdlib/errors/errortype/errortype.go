package errortype

import (
	"errors"
	"fmt"
)

type NotFoundError struct {
	Message string
}

func (e *NotFoundError) Error() string {
	return e.Message
}

func findItem(id int) (string, error) {
	if id <= 0 {
		return "", &NotFoundError{Message: "Item not found"}
	}
	return "Item found", nil
}

func Handle() {
	_, err := findItem(-1)
	if err != nil {
		var nfe *NotFoundError
		if errors.As(err, &nfe) {
			fmt.Println("Custom error:", nfe.Message)
		} else {
			fmt.Println("General error:", err)
		}
	}
}
