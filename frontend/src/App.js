import React from 'react';
import './App.css';
import BalanceCard from './components/BalanceCard';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>VocalFlow Windows Clone</h1>
                <p style={{ color: '#86868b', marginBottom: '30px' }}>
                    Production-ready MERN stack implementation for Windows.
                </p>
            </header>
            <main>
                <BalanceCard />
            </main>
            <footer style={{ marginTop: '50px', fontSize: '12px', color: '#86868b' }}>
                <p>&copy; 2026 VocalFlow Windows. Built with MERN Stack.</p>
            </footer>
        </div>
    );
}

export default App;
