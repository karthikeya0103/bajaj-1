import React, { useState } from 'react';

const ResultPage = ({ response }) => {
    const [visibleSections, setVisibleSections] = useState({
        numbers: true,
        alphabets: true,
        highest_alphabet: true
    });

    const toggleSection = (section) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
            <div className="space-y-2 mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={visibleSections.numbers}
                        onChange={() => toggleSection('numbers')}
                        className="mr-2"
                    />
                    Numbers
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={visibleSections.alphabets}
                        onChange={() => toggleSection('alphabets')}
                        className="mr-2"
                    />
                    Alphabets
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={visibleSections.highest_alphabet}
                        onChange={() => toggleSection('highest_alphabet')}
                        className="mr-2"
                    />
                    Highest Alphabet
                </label>
            </div>
            {visibleSections.numbers && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Numbers</h2>
                    <p>{response.numbers.join(', ')}</p>
                </div>
            )}
            {visibleSections.alphabets && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Alphabets</h2>
                    <p>{response.alphabets.join(', ')}</p>
                </div>
            )}
            {visibleSections.highest_alphabet && (
                <div>
                    <h2 className="text-xl font-semibold">Highest Alphabet</h2>
                    <p>{response.highest_alphabet.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
