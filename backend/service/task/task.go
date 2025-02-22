package taskService

import (
	"encoding/json"
	"jen-and-reece-backend/db"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type NewTask struct {
	CategoryIdStruct
	Description string `json:"description"`
}

type CategoryIdStruct struct {
	CategoryId int `json:"categoryId"`
}

type TaskId struct {
	Id int `json:"id"`
}

type FullId struct {
	TaskId
	CategoryIdStruct
}

type Task struct {
	NewTask
	TaskId
}

type TasKWithoutCategoryId struct {
	TaskId
	Description string `json:"description"`
}

func HandleCreateTask(w http.ResponseWriter, r *http.Request) {
	var body NewTask

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	description := body.Description
	categoryId := body.CategoryId

	_, err := db.DB.Exec(`INSERT INTO task (category_id, description) VALUES ($1, $2) `, categoryId, description)
	if err != nil {
		log.Printf("%s", err)
	}
	w.WriteHeader(http.StatusNoContent)
}

func HandleDeleteTask(w http.ResponseWriter, r *http.Request) {
	var body FullId

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	id := body.Id
	categoryId := body.CategoryId

	_, err := db.DB.Exec(`DELETE FROM task WHERE id=$1 AND category_id=$2`, id, categoryId)

	if err != nil {
		log.Printf("%s", err)
	}
	w.WriteHeader(http.StatusNoContent)
}

func HandleGetTasks(w http.ResponseWriter, r *http.Request) {
	categoryId, _ := strconv.Atoi(mux.Vars(r)["categoryId"])

	rows, _ := db.DB.Query(`SELECT id, description FROM task WHERE category_id=$1`, categoryId)
	res := []TasKWithoutCategoryId{}

	for rows.Next() {
		var row TasKWithoutCategoryId
		rows.Scan(&row.Id, &row.Description)
		res = append(res, row)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func HandleEditTask(w http.ResponseWriter, r *http.Request) {
	var body Task

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	_, err := db.DB.Exec(`UPDATE task SET description=$1 WHERE id=$2 AND category_id=$3`, body.Description, body.Id, body.CategoryId)

	if err != nil {
		log.Printf("%s", err)
	}
	w.WriteHeader(http.StatusNoContent)
}
