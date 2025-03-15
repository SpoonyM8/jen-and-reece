CREATE TABLE IF NOT EXISTS auth (
  password varchar(255),
  salt varchar(255)
);

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255)
);

CREATE TABLE IF NOT EXISTS task (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER,
  description varchar(255),
  CONSTRAINT FK_task FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS exercise (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS exercise_log (
  exercise_id INTEGER,
  date_completed DATE DEFAULT CURRENT_DATE,
  set_1_weight INTEGER NOT NULL,
  set_1_reps INTEGER NOT NULL,
  set_2_weight INTEGER,
  set_2_reps INTEGER,
  set_3_weight INTEGER,
  set_3_reps INTEGER,
  set_4_weight INTEGER,
  set_4_reps INTEGER,
  CONSTRAINT PK_exercise_log PRIMARY KEY (exercise_id, date_completed),
  CONSTRAINT FK_exercise_log FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);

CREATE TABLE IF NOT EXISTS workout_template (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS workout_template_exercise (
  exercise_id INTEGER,
  workout_template_id INTEGER,
  CONSTRAINT FK_workout_template_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id),
  CONSTRAINT FK_workout_template FOREIGN KEY (workout_template_id) REFERENCES workout_template(id)
);
