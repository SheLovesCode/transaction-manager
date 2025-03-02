from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .config import Config

load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        from .routes import transaction_bp
        app.register_blueprint(transaction_bp, url_prefix="/transactions")

        db.create_all()  # Ensure tables are created

    return app
