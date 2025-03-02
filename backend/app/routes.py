from flask import Blueprint, request, jsonify
from .models import db, Transaction
from .schemas import TransactionSchema
from .services import create_transaction, get_transactions

transaction_bp = Blueprint("transactions", __name__)

transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)

@transaction_bp.route("/", methods=["POST"])
def add_transaction():
    data = request.get_json()
    errors = transaction_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    transaction = create_transaction(data)
    return transaction_schema.jsonify(transaction), 201


@transaction_bp.route("/", methods=["GET"])
def list_transactions():
    transactions = get_transactions()
    return transactions_schema.jsonify(transactions), 200
