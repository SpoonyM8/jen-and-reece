package categoryService

import (
	"encoding/json"
	"jen-and-reece-backend/db"
	"log"
	"net/http"
)

type NewCategory struct {
	Name string `json:"name"`
}

type CategoryId struct {
	Id int `json:"id"`
}

type Category struct {
	NewCategory
	CategoryId
}

func HandleGetCategories(w http.ResponseWriter, r *http.Request) {
	rows, _ := db.DB.Query(`SELECT id, name FROM category`)
	res := []Category{}

	for rows.Next() {
		var row Category
		rows.Scan(&row.Id, &row.Name)
		res = append(res, row)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func HandleCreateCategory(w http.ResponseWriter, r *http.Request) {
	var body NewCategory

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %s", err, body)
	}

	name := body.Name

	db.DB.Exec(`INSERT INTO category (name) VALUES ($1) `, name)
	w.WriteHeader(http.StatusNoContent)
}

func HandleDeleteCategory(w http.ResponseWriter, r *http.Request) {
	var body CategoryId

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	id := body.Id

	db.DB.Exec(`DELETE FROM category WHERE id=$1`, id)
	w.WriteHeader(http.StatusNoContent)
}

func HandleEditCategory(w http.ResponseWriter, r *http.Request) {
	var body Category

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	id := body.Id
	name := body.Name

	db.DB.Exec(`UPDATE category SET name=$1 WHERE id=$2`, name, id)
	w.WriteHeader(http.StatusNoContent)
}
