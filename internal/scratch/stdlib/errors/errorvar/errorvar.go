package errorvar

import (
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("item not found")

func findItem(id int) (string, error) {
	if id <= 0 {
		return "", fmt.Errorf("find item %d: %w", id, ErrNotFound)
	}
	return "Item found", nil
}

func Handle() {
	_, err := findItem(-1)
	if err != nil {
		if errors.Is(err, ErrNotFound) {
			fmt.Println("Guess it doesn't exist:", err)
		} else {
			fmt.Println("General error:", err)
		}
	}
}
