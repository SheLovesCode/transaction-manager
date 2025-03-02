from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample in-memory data structure to simulate records
records = []


# Route to check if the API is working
@app.route('/')
def home():
    return "Financial Records Entry System - API is running!"


# Route to add a financial record
@app.route('/add_record', methods=['POST'])
def add_record():
    data = request.get_json()  # Get data sent in the request body (JSON)

    # Ensure that the required fields are present
    if not all(key in data for key in ("date", "amount", "description")):
        return jsonify({"error": "Missing required fields"}), 400

    record = {
        "id": len(records) + 1,  # Simple incrementing ID for the record
        "date": data["date"],
        "amount": data["amount"],
        "description": data["description"]
    }

    records.append(record)  # Add the record to the list

    return jsonify({"message": "Record added successfully", "record": record}), 201


# Route to get all records
@app.route('/get_records', methods=['GET'])
def get_records():
    return jsonify({"records": records}), 200


# Route to get a specific record by ID
@app.route('/get_record/<int:record_id>', methods=['GET'])
def get_record(record_id):
    record = next((r for r in records if r['id'] == record_id), None)

    if record is None:
        return jsonify({"error": "Record not found"}), 404

    return jsonify({"record": record}), 200


if __name__ == '__main__':
    app.run(debug=True)
