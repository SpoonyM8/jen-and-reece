package main

import (
	"encoding/json"
	"jen-and-reece-backend/util"
	"log"
	"net/http"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		w.Header().Set("Content-Type", "application/json")
		tok, err := util.GenerateJwt()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		}

		json.NewEncoder(w).Encode(map[string]string{"token": tok})
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
	port := "8080"
	http.HandleFunc("/api/login", loginHandler)

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("Server failed: %s", err)
	} else {
		log.Printf("Server running on port %s", port)
	}
}
