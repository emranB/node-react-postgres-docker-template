-- Create the database if it doesn't already exist
CREATE DATABASE mydb;

-- Connect to the new database
\c mydb;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    uuid UUID PRIMARY KEY,
    fname VARCHAR(100),
    lname VARCHAR(100),
    age INTEGER
);
