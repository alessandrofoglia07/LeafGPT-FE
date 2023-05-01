import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import VerifyPage from './pages/VerifyPage';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
    return (
        <div id='App'>
            <AuthProvider authType='cookie' authName='auth' cookieDomain={window.location.hostname} cookieSecure={false}>
                <Router>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <RequireAuth loginPath='/auth'>
                                    <MainPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='/c/:id'
                            element={
                                <RequireAuth loginPath='/auth'>
                                    <ChatPage />
                                </RequireAuth>
                            }
                        />
                        <Route path='/auth' element={<AuthPage />} />
                        <Route path='/auth/signup' element={<SignupPage />} />
                        <Route path='/auth/login' element={<LoginPage />} />
                        <Route path='/auth/verify/:token' element={<VerifyPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
};

export default App;
