from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Sequence
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

# 
class USERS(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, Sequence('USER_ID_SEQ'), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    hashed_password = db.Column(db.String(256), nullable=False)
    stocks = db.relationship('STOCKS', backref='user')

# 
class STOCKS(db.Model):
    __tablename__ = 'stocks'
    id = db.Column(db.Integer, Sequence('stock_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    symbol = db.Column(db.String(10))
    shares = db.Column(db.Integer)
    purchase_price = db.Column(db.Numeric(10,2))

    





