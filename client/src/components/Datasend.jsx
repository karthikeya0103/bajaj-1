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

            const response = await axios.post('https://bajaj-65le.onrender.com/bfhl', {
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
        <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='{"data": ["7", "H", "k", "R", "18"]}'
                    rows="10"
                    cols="50"
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default Datasend;
