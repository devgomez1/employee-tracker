DROP DATABASE IF EXISTS companyTracker_db;
CREATE DATABASE companyTracker_db;

USE companyTracker_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
)

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT NOT NULL,
    role_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    manger_id VARCHAR (50) NULL
)