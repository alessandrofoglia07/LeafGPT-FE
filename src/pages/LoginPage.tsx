import React, { useState } from 'react';
import { Stack, Typography, TextField, Button, Link, Snackbar, Alert, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import forestTheme from '../forestTheme';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [incorrectPwdError, setIncorrectPwdError] = useState(false);
    const [emailNotRegisteredError, setEmailNotRegisteredError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [emailNotVerifiedError, setEmailNotVerifiedError] = useState(false);
    const [unknownError, setUnknownError] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
    };

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (res.data.message === 'Login successful') {
            if (
                signIn({
                    token: res.data.token,
                    expiresIn: 28800,
                    tokenType: 'Bearer',
                    authState: {
                        id: res.data.id,
                        email: res.data.email,
                        username: res.data.username
                    }
                })
            ) {
                navigate('/');
            } else {
                console.log('Login failed');
                setUnknownError(true);
            }
        } else if (res.data.message === 'Email not registered') {
            setEmailNotRegisteredError(true);
        } else if (res.data.message === 'Incorrect password') {
            setIncorrectPwdError(true);
        } else if (res.data.message === 'Email not verified') {
            setEmailNotVerifiedError(true);
        } else if (res.data.message === 'Server error') {
            setServerError(true);
        } else {
            setUnknownError(true);
        }
    };

    const handleAlertClose = () => {
        setEmailNotRegisteredError(false);
        setIncorrectPwdError(false);
        setServerError(false);
        setEmailNotVerifiedError(false);
        setUnknownError(false);
    };

    return (
        <div id='LoginPage' style={{ width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4' sx={{ mt: '30px', position: 'absolute', pointerEvents: 'none' }}>
                🍀
            </Typography>
            <form autoComplete='off' onSubmit={handleConfirm}>
                <Stack spacing={2} direction='column' textAlign='center' alignItems='center' sx={{ width: '100%', maxWidth: '350px', mt: '270px' }}>
                    <Typography variant='h4' sx={{ fontFamily: 'Noto Sans', letterSpacing: '-1px', width: '350px', mb: '20px' }}>
                        <b>Welcome back</b>
                    </Typography>
                    <ThemeProvider theme={forestTheme}>
                        <TextField
                            id='email'
                            value={email}
                            onChange={handleEmailChange}
                            type='email'
                            label='Email address'
                            variant='outlined'
                            color='secondary'
                            sx={{ width: 'calc(100% - 20px)' }}
                        />
                        <TextField
                            id='password'
                            value={password}
                            onChange={handlePasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            variant='outlined'
                            color='secondary'
                            sx={{ width: 'calc(100% - 20px)' }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                    </IconButton>
                                )
                            }}
                        />
                        <Button variant='contained' type='submit' color='primary' sx={{ width: 'calc(100% - 20px)', height: '50px', top: '10px' }}>
                            Continue
                        </Button>
                        <Typography variant='body2' sx={{ fontFamily: 'Noto Sans', top: '10px' }}>
                            Already have an account?{' '}
                            <Link color='primary' href='/auth/login' sx={{ textDecoration: 'none' }}>
                                Log in
                            </Link>
                        </Typography>
                    </ThemeProvider>
                </Stack>
            </form>
            <Snackbar open={incorrectPwdError} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Incorrect password
                </Alert>
            </Snackbar>
            <Snackbar open={emailNotRegisteredError} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Email not registered
                </Alert>
            </Snackbar>
            <Snackbar open={serverError} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Server error
                </Alert>
            </Snackbar>
            <Snackbar open={emailNotVerifiedError} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Email not verified
                </Alert>
            </Snackbar>
            <Snackbar open={unknownError} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Unknown error
                </Alert>
            </Snackbar>
        </div>
    );
};

export default LoginPage;
