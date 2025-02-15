package main

import (
	"jen-and-reece-backend/db"
	"jen-and-reece-backend/service"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func setContentTypeMiddleware(r *mux.Router, contentType string) {
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", contentType)
			next.ServeHTTP(w, r)
		})
	})
}

func main() {
	r := mux.NewRouter()
	setContentTypeMiddleware(r, "application/json")
	db.InitDB()
	apiRouter := r.PathPrefix("/api").Subrouter()
	apiRouter.Methods("POST").Path("/login").HandlerFunc(service.HandleLogin)

	log.Printf("Server started on port 8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatalf("Server failed: %s", err)
	}
}
