package main

import (
	"errors"
	"fmt"
)

func main() {
	fmt.Println("=== Named Return Value ===")
	err := namedReturnExample()
	fmt.Printf("Result: %v\n\n", err)

	fmt.Println("=== Unnamed Return Value ===")
	err = unnamedReturnExample()
	fmt.Printf("Result: %v\n\n", err)

	fmt.Println("=== Error in Defer Handling ===")
	err = deferWithOwnError()
	fmt.Printf("Result: %v\n", err)
}

// ✅ Defer modifies the named return variable.
func namedReturnExample() (err error) {
	defer func() {
		if err != nil {
			fmt.Println("Defer sees error:", err)
			err = fmt.Errorf("wrapped error in defer: %w", err)
		}
	}()
	err = errors.New("original error")
	return
}

// ❌ Defer CANNOT modify the unnamed return variable.
func unnamedReturnExample() error {
	var err error
	defer func() {
		if err != nil {
			fmt.Println("Defer sees error:", err)
			err = fmt.Errorf("wrapped error in defer: %w", err)
		}
	}()
	err = errors.New("original error")
	return err
}

// 🔥 Demonstrates defer that has its own error (like a Close() error).
func deferWithOwnError() (err error) {
	defer func() {
		if closeErr := errors.New("error in defer cleanup"); closeErr != nil {
			if err != nil {
				err = fmt.Errorf("main error: %v; also defer error: %w", err, closeErr)
			} else {
				err = closeErr
			}
		}
	}()
	err = errors.New("main function error")
	return
}
