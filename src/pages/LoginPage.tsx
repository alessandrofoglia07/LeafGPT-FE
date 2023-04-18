/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Stack, Typography, TextField, Button, Link, Snackbar, Alert, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import forestTheme from '../forestTheme';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import axios from 'axios';

const LoginPage = () => {
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

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        console.log(res.data);
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
        </div>
    );
};

export default LoginPage;
