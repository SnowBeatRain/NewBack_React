package main

import (
	"log"
	"net/http"
	"path"
	"strings"
	"time"
)

const baseURL = "/superplatform/"

var specialURL = []string{
	baseURL, baseURL + "login", baseURL + "register", baseURL + "pages/*", baseURL + "pages/*/*", baseURL + "pages/*/*/*",
}

func dealStaticFiles(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL.Path)
	for _, v := range specialURL {
		ok, _ := path.Match(v, r.URL.Path)
		if ok {
			http.ServeFile(w, r, "./static/index.html")
			return
		}
	}
	dir := "./static/"
	a := strings.TrimPrefix(r.URL.Path, baseURL)
	http.ServeFile(w, r, dir+a)
}

func main() {
	http.HandleFunc(baseURL, dealStaticFiles)
	s := &http.Server{
		Addr:           ":7000",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	err := s.ListenAndServe()
	if err != nil {
		log.Fatalln("启动失败", err.Error())
	}
}
