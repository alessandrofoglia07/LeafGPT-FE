import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignupPage';

const App = () => {
    return (
        <div id='App'>
            <Router>
                <Routes>
                    <Route path='/auth' element={<AuthPage />} />
                    <Route path='/auth/signup' element={<SignupPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
