DROP DATABASE IF EXISTS factory_db;

CREATE DATABASE factory_db;

USE factory_db;
# create three tables for departments roles and employees

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   role_title VARCHAR(30) NOT NULL,
   department_id INT,
   salary DECIMAL,
   FOREIGN KEY (department_id)
       REFERENCES department(id)
       ON DELETE SET NULL
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT,
   manager_id INT,
   FOREIGN KEY (manager_id)
       REFERENCES employee(id)
       ON DELETE SET NULL
);
