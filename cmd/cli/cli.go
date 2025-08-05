package main

import (
	"context"
	"log"

	"github.com/seannyphoenix/scratch/internal/scratch"
)

func main() {
	ctx := context.Background()

	if err := scratch.RunModules(ctx); err != nil {
		log.Fatal(err)
	}
}
