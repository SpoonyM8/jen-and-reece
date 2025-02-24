package main

import (
	"jen-and-reece-backend/db"
	authService "jen-and-reece-backend/service/auth"
	categoryService "jen-and-reece-backend/service/categories"
	taskService "jen-and-reece-backend/service/task"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
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
	// @todo: verify jwt middleware
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

	log.Printf("Server started on port 8080")
	err := http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PATCH"}))(r))
	if err != nil {
		log.Fatalf("Server failed: %s", err)
	}
}
