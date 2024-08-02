import React, { useState } from 'react';
import DataForm from './components/Datasend';
import ResponseDisplay from './components/ResultPage';
import './App.css';

function App() {
    const [response, setResponse] = useState(null);

    return (
        <div className="App">
            <h1>Sivamani Test</h1>
            <DataForm setResponse={setResponse} />
            {response && <ResponseDisplay response={response} />}
        </div>
    );
}

export default App;
