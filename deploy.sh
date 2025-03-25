#!/bin/bash

# Function to generate a strong password
generate_password() {
    # You can customize the length and complexity of the password here
    < /dev/urandom tr -dc 'A-Za-z0-9_#%^&+=' | head -c 30
}

# Prompt for IP address, DB password, and Redis password
read -p "Enter your server's IP (leave blank to auto-detect): " ipaddress
read -p "Enter your DB password (leave blank to auto-generate): " password
read -p "Enter your Redis password (leave blank to auto-generate): " passwordredis
echo

# If IP is not provided, auto-detect the IPv4 address of the server
if [ -z "$ipaddress" ]; then
    ipaddress=$(hostname -I | awk '{print $1}')  # Get the first IP address
    echo "No IP address provided. Using server's IP: $ipaddress"
fi

# If DB password is not provided, generate a strong password
if [ -z "$password" ]; then
    password=$(generate_password)
    echo "No DB password provided. Generated password: $password"
fi

# If Redis password is not provided, generate a strong password
if [ -z "$passwordredis" ]; then
    passwordredis=$(generate_password)
    echo "No Redis password provided. Generated password: $passwordredis"
fi

echo

# Path to your .env files
ROOT_ENV_FILE=".env"
API_ENV_FILE="api/.env"
WEBSITE_ENV_FILE="admin/.env"

# Check if .env file exists, if not copy from example
if [ ! -f "$ROOT_ENV_FILE" ]; then
    cp .env.example .env
fi

if [ ! -f "$API_ENV_FILE" ]; then
    cp api/.env.example api/.env
fi

if [ ! -f "$WEBSITE_ENV_FILE" ]; then
    cp admin/.env.example admin/.env
fi

# Update or add DB_PASSWORD in the .env file for ROOT
if grep -q "^DB_PASSWORD=" "$ROOT_ENV_FILE"; then
    sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=$password/" "$ROOT_ENV_FILE"
else
    echo "DB_PASSWORD=$password" >> "$ROOT_ENV_FILE"
fi

# Update or add REDIS_PASS in the .env file for ROOT
if grep -q "^REDIS_PASS=" "$ROOT_ENV_FILE"; then
    sed -i "s/^REDIS_PASS=.*/REDIS_PASS=$passwordredis/" "$ROOT_ENV_FILE"
else
    echo "REDIS_PASS=$passwordredis" >> "$ROOT_ENV_FILE"
fi

# Update or add DB_PASSWORD in the .env file for API
if grep -q "^DB_PASSWORD=" "$API_ENV_FILE"; then
    sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=$password/" "$API_ENV_FILE"
else
    echo "DB_PASSWORD=$password" >> "$API_ENV_FILE"
fi

# Update or add REDIS_PASS in the .env file for API
if grep -q "^REDIS_PASS=" "$API_ENV_FILE"; then
    sed -i "s/^REDIS_PASS=.*/REDIS_PASS=$passwordredis/" "$API_ENV_FILE"
else
    echo "REDIS_PASS=$passwordredis" >> "$API_ENV_FILE"
fi

# Update or add NEXT_PUBLIC_API_BASE_URL in the .env file for WEBSITE
if grep -q "^NEXT_PUBLIC_API_BASE_URL=" "$WEBSITE_ENV_FILE"; then
    sed -i "s|^NEXT_PUBLIC_API_BASE_URL=.*|NEXT_PUBLIC_API_BASE_URL=http://$ipaddress:8000|" "$WEBSITE_ENV_FILE"
else
    echo "NEXT_PUBLIC_API_BASE_URL=http://$ipaddress:8000" >> "$WEBSITE_ENV_FILE"
fi

echo "Configuration done, running docker build..."

# Run the docker-compose command to build and start the containers
docker compose up -d --build
