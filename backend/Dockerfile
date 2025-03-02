FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

ENV FLASK_APP=app.py \
    FLASK_ENV=development

# Run Flask server
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]

