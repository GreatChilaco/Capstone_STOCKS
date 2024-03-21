import React, { useState } from 'react';
import axios from 'axios';

const AddStock = () => {
    const [userId, setUserId] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleStockSymbolChange = (e) => {
        setStockSymbol(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/users/<user_id>/addStock', { userId, stockSymbol })
            .then((response) => {
                console.log('Stock added:', response.data);
            })
            .catch((error) => {
                console.error('Error adding stock:', error);
            });

        setUserId('');
        setStockSymbol('');
    };

    return (
        <div>
            <h2>Add Stock</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userId">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={handleUserIdChange}
                />

                <label htmlFor="stockSymbol">Stock Symbol:</label>
                <input
                    type="text"
                    id="stockSymbol"
                    value={stockSymbol}
                    onChange={handleStockSymbolChange}
                />

                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
};

export default AddStock;