from flask import Flask, jsonify
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

portfolio = {
    "AAPL": 1000,
    "GOOG": 2000,
    "TSLA": 1500,
}

stocks_info = {
    "AAPL": {"name": "Apple Inc.", "investment": 1000},
    "GOOG": {"name": "Alphabet Inc.", "investment": 2000},
    "TSLA": {"name": "Tesla Inc.", "investment": 1500},
}


API_KEY = "DAGLNQV2LIT0MB4U"

# Assuming total_investment and ROI are calculated here for simplicity
total_investment = sum(portfolio.values())
# Placeholder for actual ROI calculation
roi = 10  

@app.route("/portfolio", methods=["GET"])
def get_portfolio():
    symbols = portfolio.keys()
    portfolio_data = [{"name": symbol, "ticker": symbol, "% of portfolio": (portfolio[symbol] / total_investment) * 100} for symbol in symbols]
    return jsonify({"total_investment": total_investment, "roi": roi, "stocks": portfolio_data})

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