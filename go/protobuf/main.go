package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/google/uuid"
	"github.com/seannyphoenix/scratch/go/protobuf/doodad"
	"google.golang.org/protobuf/proto"
)

func main() {
	dd := &doodad.DooDad{
		Id:          newUUID(),
		Name:        "foo",
		Description: "bar",
	}

	p, _ := proto.Marshal(dd)
	j, _ := json.Marshal(dd)

	fmt.Printf("go struct:     %v\n", dd)
	fmt.Printf("proto.Marshal: %v\n", p)
	fmt.Printf("(%d bytes)\n", len(p))
	fmt.Printf("json.Marshal:  %v\n", j)
	fmt.Printf("(%d bytes)\n", len(j))
}

func newUUID() []byte {
	b, err := uuid.New().MarshalBinary()
	if err != nil {
		log.Fatalf("error marshaling UUID: %v", err)
	}
	return b
}
