package authService

import (
	"encoding/json"
	"jen-and-reece-backend/db"
	"jen-and-reece-backend/util"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type Login struct {
	Password string `json:"password"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	var body Login

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %s", err, body)
	}
	password := body.Password

	storedHash, storedSalt := getCredsFromDb()

	if !doPasswordsMatch(storedHash, password, storedSalt) {
		log.Print("PASSWORDS DONT MATCH")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Incorrect Password"})
		return
	}

	tok, err := util.GenerateJwt()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
	}

	json.NewEncoder(w).Encode(map[string]string{"token": tok})
}

func doPasswordsMatch(storedPassword string, loginPassword string, salt string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(loginPassword+salt)); err != nil {
		return false
	}
	return true
}

func getCredsFromDb() (string, string) {
	var storedPassword, storedSalt string
	db.DB.QueryRow(`SELECT password, salt FROM auth;`).Scan(&storedPassword, &storedSalt)
	return storedPassword, storedSalt
}
