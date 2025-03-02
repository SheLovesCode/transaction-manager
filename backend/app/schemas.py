from marshmallow import Schema, fields, validate

class TransactionSchema(Schema):
    id = fields.Int(dump_only=True)
    amount = fields.Float(required=True)
    date = fields.DateTime(required=True)
    type = fields.Str(required=True, validate=validate.OneOf(["credit", "debit"]))
    description = fields.Str(required=True)
