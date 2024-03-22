from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Sequence
import bcrypt


db = SQLAlchemy()

# 
class USERS(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, Sequence('user_id_seq'), primary_key=True)
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


def hash_password(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')

def check_hashed_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
     