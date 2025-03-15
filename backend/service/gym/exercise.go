package gym

import (
	"encoding/json"
	"jen-and-reece-backend/db"
	"log"
	"net/http"
)

type ExerciseName struct {
	Name string `json:"name"`
}

type ExerciseId struct {
	Id int `json:"id"`
}

type Exercise struct {
	ExerciseName
	Id int `json:"id"`
}

type ExerciseSet struct {
	Weight *int `json:"weight,omitempty"`
	Reps   *int `json:"reps,omitempty"`
}

type ExerciseLog struct {
	ExerciseId
	FirstSet  ExerciseSet  `json:"firstSet"`
	SecondSet *ExerciseSet `json:"secondSet"`
	ThirdSet  *ExerciseSet `json:"thirdSet"`
	FourthSet *ExerciseSet `json:"fourthSet"`
	Date      string       `json:"dateCompleted"`
}

func HandleGetExercises(w http.ResponseWriter, r *http.Request) {
	rows, _ := db.DB.Query(`SELECT * FROM exercise`)
	var res []Exercise

	for rows.Next() {
		var ex Exercise
		rows.Scan(&ex.Id, &ex.Name)
		res = append(res, ex)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func HandleCreateExercise(w http.ResponseWriter, r *http.Request) {
	var body ExerciseName

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	name := body.Name

	res := ExerciseId{}

	row := db.DB.QueryRow(`INSERT INTO exercise (name) VALUES ($1) RETURNING id`, name)

	row.Scan(&res.Id)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func HandleEditExercise(w http.ResponseWriter, r *http.Request) {
	var body Exercise

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	if _, err := db.DB.Exec(`UPDATE exercise SET name=$1 WHERE id=$2`, body.Name, body.Id); err != nil {
		log.Printf("%v", err)
	}
	w.WriteHeader(http.StatusNoContent)
}

func logExercise(exerciseLog ExerciseLog) {
	insertColumns := `INSERT INTO exercise_log (exercise_id, date_completed, set_1_weight, set_1_reps`
	insertValues := `VALUES ($1,$2,$3,$4`
	args := []interface{}{exerciseLog.Id, exerciseLog.Date, *exerciseLog.FirstSet.Weight, *exerciseLog.FirstSet.Reps}

	if secondSet := exerciseLog.SecondSet; secondSet != nil {
		insertColumns += `, set_2_weight, set_2_reps`
		insertValues += `,$5,$6`
		args = append(args, *secondSet.Weight, *secondSet.Reps)
	} else if thirdSet := exerciseLog.ThirdSet; thirdSet != nil {
		insertColumns += `, set_3_weight, set_3_reps`
		insertValues += `,$7,$8`
		args = append(args, *thirdSet.Weight, *thirdSet.Reps)
	} else if fourthSet := exerciseLog.FourthSet; fourthSet != nil {
		insertColumns += `, set_4_weight, set_4_reps`
		insertValues += `,$9,$10`
		args = append(args, *fourthSet.Weight, *fourthSet.Reps)
	}

	insertColumns += `) `
	insertValues += `)`

	if _, err := db.DB.Exec(insertColumns+insertValues, args...); err != nil {
		log.Printf("%v", err)
	}
}

func HandleLogExercise(w http.ResponseWriter, r *http.Request) {
	var body []ExerciseLog

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		log.Printf("%s %v", err, body)
	}

	for _, exerciseLog := range body {
		logExercise(exerciseLog)
	}

	w.WriteHeader(http.StatusNoContent)
}
