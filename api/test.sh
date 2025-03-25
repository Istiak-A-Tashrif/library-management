#!/bin/bash

# Prompt the user for database connection details, providing sensible defaults
read -p "Enter the PostgreSQL username [default: postgres]: " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "Enter the PostgreSQL password [default: 1234]: " DB_PASSWORD
echo
DB_PASSWORD=${DB_PASSWORD:-1234}

read -p "Enter the PostgreSQL host [default: localhost]: " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Enter the PostgreSQL port [default: 5432]: " DB_PORT
DB_PORT=${DB_PORT:-5432}

# Prompt for the database to connect to
read -p "Enter the name of the database to connect to [default: postgres]: " DB_NAME
DB_NAME=${DB_NAME:-postgres}

# Prompt for the new database name
read -p "Enter the database name to create if it doesn't exist: " NEW_DB_NAME

# Connect to the PostgreSQL server and create the database if it doesn't exist
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "SELECT 1 FROM pg_database WHERE datname='$NEW_DB_NAME'" | grep -q 1

if [ $? -ne 0 ]; then
    echo "Database '$NEW_DB_NAME' does not exist. Creating..."
    PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "CREATE DATABASE \"$NEW_DB_NAME\";"
    if [ $? -eq 0 ]; then
        echo "Database '$NEW_DB_NAME' created successfully."
    else
        echo "Failed to create database '$NEW_DB_NAME'."
    fi
else
    echo "Database '$NEW_DB_NAME' already exists."
fi
