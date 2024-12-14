import React, { useState } from 'react';

import './searchbar.component.css';
import Card from '../card/card.component';
import ScholarAnalysis from '../analysis/scholarAnalysis.component';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);
        setLoading(true);

        const formattedQuery = query
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        try {

            const response = await fetch(`http://127.0.0.1:5000/api/scholar/${formattedQuery}`);
            if (!response.ok) {
                throw new Error('Author not found or an error occurred.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2 className="heading">Enter the name of the Scholar</h2>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    name="query"
                    className="search-input"
                    placeholder="Type here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>


            {loading && <p className="loading">Thinking...</p>}

            {error && <p className="error">{error}</p>}


            {/* {result && (
                <div className="result">
                    <ScholarAnalysis author={result.author} />
                    
                </div>
            )} */}

            {result && (
                <div className="result">
                    <Card author={result.author} />
                    <ScholarAnalysis analysis={result.analysis} />
                </div>
            )}


        </div>
    );
};

export default SearchBar;
