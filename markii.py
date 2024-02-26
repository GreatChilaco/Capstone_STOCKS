import os
import requests
from flask import Flask, jsonify

app = Flask(__name__)

API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
API_KEY = "alohomora"

# This dictionary stores the portfolio data.
# Each key is a stock symbol, and each value is the amount of money invested in that stock.
portfolio = {
    "AAPL": 1000,
    "GOOG": 2000,
    "TSLA": 1500,
}

@app.route('/symbols', methods=['GET'])
def get_symbols():
    return jsonify(list(portfolio.keys()))

@app.route('/symbols/<symbol_name>', methods=['GET'])
def get_symbol_values(symbol_name):
    if symbol_name in portfolio:
        response = requests.get(f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol_name}&apikey={API_KEY}')
        data = response.json()
        current_price = float(data["Global Quote"]["05. price"])
        investment = portfolio[symbol_name]
        return jsonify({
            "symbol": symbol_name,
            "current_price": current_price,
            "investment": investment,
            "value": current_price * investment,
        })
    else:
        return jsonify({"error": "Symbol not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
