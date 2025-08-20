package main

func main() {
	// Example usage of the must function
	result := must(try())
	println(result)
}

func must[T any](v T, err error) T {
	if err != nil {
		panic(err)
	}
	return v
}

func try() (int, error) {
	return 27, nil
}
