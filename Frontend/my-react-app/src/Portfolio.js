import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({ total_investment: 0, roi: 0, stocks: [] });
  const [selectedStock, setSelectedStock] = useState(null);
  const [closingPrices, setClosingPrices] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const response = await axios.get('https://mcsbt-integration-jcvlo.ew.r.appspot.com/portfolio');
    setPortfolio(response.data);
  };

  const handleStockClick = async (ticker) => {
    const response = await axios.get(`https://mcsbt-integration-jcvlo.ew.r.appspot.com/${ticker}`);
    setSelectedStock(ticker);
    setClosingPrices(response.data.closing_prices);
  };

  return (
    <div>
      <h2>Total Investment: {portfolio.total_investment}</h2>
      <h2>ROI: {portfolio.roi}%</h2>
      <table>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Ticker</th>
            <th>% of Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.stocks.map((stock, index) => (
            <tr key={index} onClick={() => handleStockClick(stock.ticker)}>
              <td>{stock.name}</td>
              <td>{stock.ticker}</td>
              <td>{stock['% of portfolio'].toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStock && (
        <div>
          <h3>Closing Prices for {selectedStock} (Last 12 Months):</h3>
          <ul>
            {closingPrices.map((price, index) => (
              <li key={index}>{price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
