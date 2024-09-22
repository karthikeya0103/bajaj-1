import React, { useState } from 'react';

const ResultPage = ({ response }) => {
    // State to handle the visibility of each section
    const [visibleSections, setVisibleSections] = useState({
        numbers: true,
        alphabets: true,
        highest_alphabet: true
    });

    // Function to toggle the visibility of a section
    const toggleSection = (section) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-sm">
            {/* Toggle checkboxes for controlling visibility */}
            <div className="space-y-3 mb-5">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={visibleSections.numbers}
                        onChange={() => toggleSection('numbers')}
                        className="mr-2 accent-gray-700"
                    />
                    <span className="text-gray-700 font-medium">Numbers</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={visibleSections.alphabets}
                        onChange={() => toggleSection('alphabets')}
                        className="mr-2 accent-gray-700"
                    />
                    <span className="text-gray-700 font-medium">Alphabets</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={visibleSections.highest_alphabet}
                        onChange={() => toggleSection('highest_alphabet')}
                        className="mr-2 accent-gray-700"
                    />
                    <span className="text-gray-700 font-medium">Highest Alphabet</span>
                </label>
            </div>

            {/* Conditionally render sections based on checkbox selection */}
            {visibleSections.numbers && response.numbers.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Numbers</h2>
                    <p className="text-gray-600">{response.numbers.join(', ')}</p>
                </div>
            )}

            {visibleSections.alphabets && response.alphabets.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Alphabets</h2>
                    <p className="text-gray-600">{response.alphabets.join(', ')}</p>
                </div>
            )}

            {visibleSections.highest_alphabet && response.highest_alphabet.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Highest Alphabet</h2>
                    <p className="text-gray-600">{response.highest_alphabet.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
