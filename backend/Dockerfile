# Use a slim Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory in the container
COPY requirements.txt .

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory into the container's /app directory
COPY . .

# Copy the .env file into the container
COPY .env .env

# Run Flask server on all IP addresses and port 5000
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
