package main

import "github.com/joho/godotenv"

func main() {
	godotenv.Load()
	a()
}

func a() {
	for i := range 10 {
		println(i)
	}
}
