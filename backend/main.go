package main

import (
	"jen-and-reece-backend/db"
	authService "jen-and-reece-backend/service/auth"
	categoryService "jen-and-reece-backend/service/categories"
	gymService "jen-and-reece-backend/service/gym"
	taskService "jen-and-reece-backend/service/task"
	"jen-and-reece-backend/util"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func setHeaderMiddleware(r *mux.Router, contentType string) {
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", contentType)
			next.ServeHTTP(w, r)
		})
	})
}

func verifyJwtMiddleware(r *mux.Router) {
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/api/login" {
				err := util.VerifyJwt(r.Header.Get("Authorization"))
				if err != nil {
					log.Printf("err in verifyjwt")
					w.WriteHeader(http.StatusUnauthorized)
				} else {
					next.ServeHTTP(w, r)
				}
			} else {
				next.ServeHTTP(w, r)
			}
		})
	})
}

func main() {
	r := mux.NewRouter()
	setHeaderMiddleware(r, "application/json")
	verifyJwtMiddleware(r)

	db.InitDB()
	apiRouter := r.PathPrefix("/api").Subrouter()
	apiRouter.Methods("POST").Path("/login").HandlerFunc(authService.HandleLogin)
	apiRouter.Methods("GET").Path("/category").HandlerFunc(categoryService.HandleGetCategories)
	apiRouter.Methods("POST").Path("/category").HandlerFunc(categoryService.HandleCreateCategory)
	apiRouter.Methods("DELETE").Path("/category").HandlerFunc(categoryService.HandleDeleteCategory)
	apiRouter.Methods("PATCH").Path("/category").HandlerFunc(categoryService.HandleEditCategory)
	apiRouter.Methods("POST").Path("/task").HandlerFunc(taskService.HandleCreateTask)
	apiRouter.Methods("DELETE").Path("/task").HandlerFunc(taskService.HandleDeleteTask)
	apiRouter.Methods("GET").Path("/task/{categoryId}").HandlerFunc(taskService.HandleGetTasks)
	apiRouter.Methods("PATCH").Path("/task").HandlerFunc(taskService.HandleEditTask)
	apiRouter.Methods("GET").Path("/exercise").HandlerFunc(gymService.HandleGetExercises)
	apiRouter.Methods("POST").Path("/exercise").HandlerFunc(gymService.HandleCreateExercise)
	apiRouter.Methods("PATCH").Path("/exercise").HandlerFunc(gymService.HandleEditExercise)
	apiRouter.Methods("POST").Path("/exercise/log").HandlerFunc(gymService.HandleLogExercise)
	apiRouter.Methods("GET").Path("/exercise/log/{exerciseId}").HandlerFunc(gymService.HandleGetExerciseHistory)
	apiRouter.Methods("POST").Path("/exercise/template").HandlerFunc(gymService.HandleCreateWorkoutTemplate)
	apiRouter.Methods("PATCH").Path("/exercise/template").HandlerFunc(gymService.HandleEditWorkoutTemplate)
	apiRouter.Methods("DELETE").Path("/exercise/template").HandlerFunc(gymService.HandleDeleteWorkoutTemplate)
	apiRouter.Methods("GET").Path("/exercise/template").HandlerFunc(gymService.HandleGetWorkoutTemplates)

	log.Printf("Server started on port 8080")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "OPTIONS", "POST", "DELETE", "PATCH"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	})
	err := http.ListenAndServe(":8080", c.Handler(r))
	if err != nil {
		log.Fatalf("Server failed: %s", err)
	}
}
