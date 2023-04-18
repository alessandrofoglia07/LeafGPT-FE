import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import VerifyPage from './pages/VerifyPage';

const App = () => {
    return (
        <div id='App'>
            <Router>
                <Routes>
                    <Route path='/auth' element={<AuthPage />} />
                    <Route path='/auth/signup' element={<SignupPage />} />
                    <Route path='/auth/login' element={<LoginPage />} />
                    <Route path='/auth/verify/:token' element={<VerifyPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
