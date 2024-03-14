import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Portfolio.css'; // Ensure you have a CSS file for styling

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({
    name: '',
    total_investment: '',
    roi: '',
    stocks: []
  });

  useEffect(() => {
    // Fetch portfolio data when the component mounts
    const fetchPortfolio = async () => {
      try {
        // Include the full URL if your backend is on a different port or domain
        const response = await axios.get('http://127.0.0.1:5000/Portfolio');
        setPortfolio(response.data); // Assuming the response has the data in the correct format
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Handle errors as appropriate for your application
      }
    };

    fetchPortfolio();
  }, []);

  // Render your component using the portfolio data
  return (
    <div className="portfolio-container">
      <h2>{`'${portfolio.name}' 's Portfolio`}</h2>
      <h2>Total Investment: {portfolio.total_investment}</h2>
      <h2>ROI: {portfolio.roi}</h2>
      <table>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Shares</th>
            <th>Purchase Price</th>
            <th>Current Value</th>
            <th>Portfolio Percentage</th>
            <th>Ticker</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.shares}</td>
              <td>{`${stock.purchase_price}€`}</td>
              <td>{`${stock.current_price}€`}</td>
              <td>{`${stock.portfolio_percentage.toFixed(2)}%`}</td>
              <td>{stock.symbol}</td>
              <td><button className="remove" onClick={() => {/* handle remove stock */}}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
