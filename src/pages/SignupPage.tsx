/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Link, Snackbar, Alert, Stack, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { ThemeProvider } from '@mui/material/styles';
import forestTheme from '../forestTheme';
import '../App.css';
import axios from 'axios';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add signup logic with backend
    };

    return (
        <div id='SignupPage' style={{ backgroundColor: 'white', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4' sx={{ mt: '30px', position: 'absolute', pointerEvents: 'none' }}>
                🍀
            </Typography>
            <form autoComplete='off' onSubmit={handleConfirm}>
                <Stack spacing={2} direction='column' textAlign='center' alignItems='center' sx={{ width: '100%', maxWidth: '350px', mt: '250px' }}>
                    <Typography variant='h4' sx={{ fontFamily: 'Noto Sans', letterSpacing: '-1px' }}>
                        <b>Create your account</b>
                    </Typography>
                    <Typography variant='body2' sx={{ fontFamily: 'Noto Sans' }}>
                        Please note that you will be sent a confirmation email to verify your account.
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
                            helperText='Password must contain at least 8 characters.'
                        />
                        <Button variant='contained' type='submit' color='primary' sx={{ width: 'calc(100% - 20px)', height: '50px' }}>
                            Continue
                        </Button>
                        <Typography variant='body2' sx={{ fontFamily: 'Noto Sans' }}>
                            Already have an account?{' '}
                            <Link color='primary' href='/auth' sx={{ textDecoration: 'none' }}>
                                Log in
                            </Link>
                        </Typography>
                    </ThemeProvider>
                </Stack>
            </form>
        </div>
    );
};

export default SignupPage;
