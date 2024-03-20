from flask import Flask, jsonify
import requests
from flask_cors import CORS
from sqlalchemy.pool import NullPool
import oracledb
from models import db
from models import USERS
from models import STOCKS
from decimal import Decimal
import hashlib

#hashed_password_here

app = Flask(__name__)
CORS(app, supports_credentials=True)

un = 'backend'
pw = 'Susannpaulina99'
dsn = '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.eu-madrid-1.oraclecloud.com))(connect_data=(service_name=g441fcf8aff3469_juancarlostocks_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'

pool = oracledb.create_pool(user=un, password=pw, dsn=dsn)

app.config['SQLALCHEMY_DATABASE_URI'] = 'oracle+oracledb://'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'creator': pool.acquire,'poolclass': NullPool}
app.config['SQLALCHEMY_ECHO'] = False


db.init_app(app)

with app.app_context():
    db.create_all()

API_KEY = "DAGLNQV2LIT0MB4U"


@app.route("/login", methods=["POST"])
def login():
    # Hardcoded user credentials (for demonstration purposes only)
    # hardcoded_username = 'Juanca'
    # hardcoded_password = '1234'
    
    # Getting the data from the request
    data = requests.get_json()
    username = data['username']
    password = data['password']

    user = USERS.query.filter_by(name=username).first()

    if user and user.password == password:
        return jsonify({"message": "Login successful"}), 200    
    #if username == hardcoded_username and password == hardcoded_password:
        
    #    return jsonify({"message": "Login successful"}), 200
    #else:
        
    #    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/Portfolio", methods=["GET"])
def get_portfolio():
    user = USERS.query.filter_by(name='user1').first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    stocks = user.stocks
    
    if not stocks:
        return jsonify({"error": "No stocks found for user"}), 404

    total_investment = sum(stock.shares * stock.purchase_price for stock in stocks)
    portfolio_data = []

    for stock in stocks:
        current_price = fetch_current_price(stock.symbol)  # Placeholder function for fetching current price
        stock_investment = stock.shares * current_price
        portfolio_percentage = (Decimal(stock_investment) / total_investment) * 100 
        roi = calculate_roi(stock.purchase_price, current_price)  # Placeholder for ROI calculation

        portfolio_data.append({
            "symbol": stock.symbol,
            #cambiar name cuando encuentre de donde sacamos los nombre
            "name": stock.symbol,
            "current_price": current_price,
            "current_investment": stock_investment,
            "roi": roi,
            "portfolio_percentage": portfolio_percentage
        })

    return jsonify({
        "name": user.name, 
        "total_investment": f"{total_investment:.2f}€", 
        "stocks": portfolio_data
    })

def fetch_current_price(symbol):
    # Placeholder for fetching current price from an external API
    # For example, using Alpha Vantage or another stock price API
    # This function should return the current price of the stock
    return 100.00  # Placeholder value

def calculate_roi(purchase_price, current_price):
    # Convert float to Decimal for precise calculation
    current_price_decimal = Decimal(str(current_price))
    roi = ((current_price_decimal - purchase_price) / purchase_price) * 100
    return roi

@app.route("/historical/<symbol>", methods=["GET"])
def get_historical_data(symbol):
    response = requests.get(f"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol={symbol}&apikey={API_KEY}")
    data = response.json()
    # Extract the closing prices for the last 12 months
    monthly_closes = list(data["Monthly Time Series"].values())[:12]
    closing_prices = [float(month["4. close"]) for month in monthly_closes]
    return jsonify({"symbol": symbol, "closing_prices": closing_prices})

if __name__ == "__main__":
    app.run(debug=True)