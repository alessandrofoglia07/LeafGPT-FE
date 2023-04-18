import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

const App = () => {
    return (
        <div id='App'>
            <Router>
                <Routes>
                    <Route path='/auth' element={<AuthPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
