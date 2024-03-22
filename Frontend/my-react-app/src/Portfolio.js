import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Portfolio.css'; // Ensure you have a CSS file for styling
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';




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
  const [newStock, setNewStock] = useState({
    name: '',
    quantity: '',
    purchase_price: ''
  });

  const handleAddStock = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      // Fetch stock data using the stock name
      const response = await axios.post('/users/add_stock')

      const stockData = response.data['Global Quote'];

      // Set the purchase price equal to the current price
      const purchasePrice = parseFloat(stockData['05. price']);

      // Create a new stock object with the fetched data and the purchase price
      const newStockObject = {
        user_id: userId,
        name: stockData['01. symbol'],
        shares: newStock.quantity,
        purchase_price: purchasePrice,
        current_price: purchasePrice,
        portfolio_percentage: 0, // Calculate this value based on the total investment
        symbol: stockData['01. symbol']
      };

      // Update the portfolio state by adding the new stock to the existing stocks array
      setPortfolio(prevPortfolio => ({
        ...prevPortfolio,
        stocks: [...prevPortfolio.stocks, newStockObject]
      }));

      // Clear the input fields
      setNewStock({
        name: '',
        quantity: '',
        purchase_price: ''
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Handle errors as appropriate for your application
    }
  };




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
              <td>{`${stock.portfolio_percentage}%`}</td>
              <td>{stock.symbol}</td>
              <td><button className="remove" onClick={() => {/* handle remove stock */}}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-stock-form">
        <input
          type="text"
          placeholder="Stock Name"
          value={newStock.name}
          onChange={e => setNewStock(prevStock => ({ ...prevStock, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newStock.quantity}
          onChange={e => setNewStock(prevStock => ({ ...prevStock, quantity: e.target.value }))}
        />
        <button onClick={handleAddStock}>Add to Portfolio</button>
      </div>
    </div>
  );
};

export default Portfolio;
