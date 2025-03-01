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

func HandleCreateTask(w http.ResponseWriter, r *http.Request) {
	var body NewTask

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	description := body.Description
	categoryId := body.CategoryId

	res := TaskId{}

	row := db.DB.QueryRow(`INSERT INTO task (category_id, description) VALUES ($1, $2) RETURNING id`, categoryId, description)

	row.Scan(&res.Id)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func HandleDeleteTask(w http.ResponseWriter, r *http.Request) {
	var body FullId

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	id := body.Id
	categoryId := body.CategoryId
	log.Printf("HERE %d %d", id, categoryId)
	_, err := db.DB.Exec(`DELETE FROM task WHERE id=$1 AND category_id=$2`, id, categoryId)
	log.Printf("EXEC'd")
	if err != nil {
		log.Printf("%s", err)
	}
	log.Printf("RETURNING")
	w.WriteHeader(http.StatusNoContent)
}

func HandleGetTasks(w http.ResponseWriter, r *http.Request) {
	categoryId, _ := strconv.Atoi(mux.Vars(r)["categoryId"])

	rows, _ := db.DB.Query(`SELECT id, description, category_id FROM task WHERE category_id=$1`, categoryId)
	res := []Task{}

	for rows.Next() {
		var row Task
		rows.Scan(&row.Id, &row.Description, &row.CategoryId)
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
