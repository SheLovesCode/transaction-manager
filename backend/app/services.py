from .models import Transaction, db

def create_transaction(data):
    transaction = Transaction(**data)
    db.session.add(transaction)
    db.session.commit()
    return transaction

def get_transactions():
    return Transaction.query.all()
