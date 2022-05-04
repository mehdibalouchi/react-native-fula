package main

import (
	"fmt"
	"fulamobile/libfula/fula"
	"log"
	"os"
	"os/signal"
	"runtime"
)

func main() {

	fula := fula.NewFula()
	fula.Connect("/ip4/192.168.246.234/tcp/4002/p2p/12D3KooWLJcUKiY433MEsMX7jofKw2Qj5ogTNiJdAeX3hC9wLjkr")
	fmt.Println("We are know connected")
	// cid := fula.Send("/home/farhoud/workspace/functionland/rngofula/libfula/test.txt")

	cid := "QmWNDSNbJ6j9Dohga5q9zRjQ9k7ZCQHQHoyzPVtJXeA9kw"
	fmt.Println("cid", cid)
	meta := fula.ReceiveMeta(cid)
	fmt.Println(meta)

	runtime.Goexit()
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	go func() {
		select {
		case <-c:
			log.Printf("Close gracefully")
			signal.Stop(c)
			os.Exit(0)
		}
	}()
	fmt.Println("Exit")
	fmt.Println("R u running")

}
