package gym

import (
	"encoding/json"
	"jen-and-reece-backend/db"
	"log"
	"net/http"
)

type WorkoutTemplateId struct {
	Id int `json:"id"`
}
type WorkoutTemplate struct {
	TemplateId  *int   `json:"id"`
	ExerciseIds []int  `json:"exerciseIds"`
	Name        string `json:"name"`
}

func HandleGetWorkoutTemplates(w http.ResponseWriter, r *http.Request) {
	// return []WorkoutTemplate
}

func HandleCreateWorkoutTemplate(w http.ResponseWriter, r *http.Request) {
	var body WorkoutTemplate

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
		return
	}

	res := WorkoutTemplateId{}

	row := db.DB.QueryRow(`INSERT INTO workout_template (name) VALUES ($1) RETURNING id`, body.Name)

	row.Scan(&res.Id)

	for _, exerciseId := range body.ExerciseIds {
		_, err := db.DB.Exec(`INSERT INTO workout_template_exercise VALUES ($1, $2)`, exerciseId, res.Id)
		if err != nil {
			log.Printf("%v", err)
		}
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func HandleEditWorkoutTemplate(w http.ResponseWriter, r *http.Request) {
	var body WorkoutTemplate

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
		return
	}

	rows, _ := db.DB.Query(`SELECT exercise_id FROM workout_template_exercise WHERE workout_template_id=$1`, *body.TemplateId)

	var existingExerciseIds []int

	for rows.Next() {
		var row int
		rows.Scan(&row)
		existingExerciseIds = append(existingExerciseIds, row)
		log.Printf("%d", row)
	}

	for _, newId := range body.ExerciseIds {
		found := false
		for _, existingId := range existingExerciseIds {
			if newId == existingId {
				found = true
				break
			}
		}
		if !found {
			db.DB.Exec(`INSERT INTO workout_template_exercise VALUES ($1, $2)`, newId, *body.TemplateId)
		}
	}

	for _, existingId := range existingExerciseIds {
		found := false
		for _, newId := range body.ExerciseIds {
			if existingId == newId {
				found = true
				break
			}
		}
		if !found {
			db.DB.Exec(`DELETE FROM workout_template_exercise WHERE exercise_id=$1 AND workout_template_id=$2`, existingId, *body.TemplateId)
		}
	}
	w.WriteHeader(http.StatusNoContent)
}

func HandleDeleteWorkoutTemplate(w http.ResponseWriter, r *http.Request) {
	var body WorkoutTemplateId

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
		return
	}

	// Need to delete all entries of workout_template_exercise first or FK is violated

	db.DB.Exec(`DELETE FROM workout_template_exercise WHERE workout_template_id=$1`, body.Id)

	db.DB.Exec(`DELETE FROM workout_template WHERE id=$1`, body.Id)

	w.WriteHeader(http.StatusNoContent)
}
