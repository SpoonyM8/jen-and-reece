CREATE TABLE IF NOT EXISTS auth (
  password varchar(255),
  salt varchar(255)
);

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255)
)

CREATE TABLE IF NOT EXISTS task (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER,
  description varchar(255),
  CONSTRAINT FK_task FOREIGN KEY (category_id) REFERENCES category(id)
)