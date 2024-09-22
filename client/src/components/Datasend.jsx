import React, { useState } from 'react';
import axios from 'axios';

const Datasend = ({ setResponse }) => {
    const [jsonInput, setJsonInput] = useState(''); // To hold the JSON input
    const [error, setError] = useState(null); // For error handling

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before submitting

        try {
            const parsedInput = JSON.parse(jsonInput); // Parse the JSON input
            const { data = [] } = parsedInput; // Extract data array from JSON

            // Validate if the data field is an array
            if (!data || !Array.isArray(data)) {
                setError('Invalid input. Please provide data as an array.');
                return;
            }

            // Submit the data to the backend
            const response = await axios.post('https://bajaj-1-2-n5as.onrender.com/bfhl', {
                data,
            });

            setResponse(response.data); // Set the response to display in UI
        } catch (error) {
            setError('Invalid JSON input. Please ensure the format is correct.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows="8"
                    cols="50"
                    placeholder='Enter JSON data here, e.g. {"data": ["A", "B", "1"]}'
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
                >
                    Submit
                </button>
            </form>
            {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
        </div>
    );
};

export default Datasend;
