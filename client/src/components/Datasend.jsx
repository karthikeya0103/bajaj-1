import React, { useState } from 'react';
import axios from 'axios';

const Datasend = ({ setResponse }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const parsedInput = JSON.parse(jsonInput);
            const {
                data = [],
                user_id = 'karthi143',
                email = 'karthi143@gmail.com',
                roll_number = 'AP21110010605'
            } = parsedInput;

            if (!data || !Array.isArray(data)) {
                setError('Invalid input. Please provide data as an array.');
                return;
            }

            const response = await axios.post('https://bajaj-1-cptt.onrender.com/bfhl', {
                data,
                user_id,
                email,
                roll_number
            });

            setResponse(response.data);
        } catch (error) {
            console.error('Error submitting form:', error); 
            setError('Invalid JSON input or server error.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    
                    rows="10"
                    cols="50"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
            {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
        </div>
    );
};

export default Datasend;
