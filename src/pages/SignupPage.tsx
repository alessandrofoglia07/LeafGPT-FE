import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Link, Snackbar, Alert, Stack, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { ThemeProvider } from '@mui/material/styles';
import forestTheme from '../forestTheme';
import axios from 'axios';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);
    const [passwordTooShort, setPasswordTooShort] = useState(false);
    const [emailNotvalid, setEmailNotvalid] = useState(false);

    useEffect(() => {
        document.title = 'Sign up to ForestAI';
    }, []);

    const emailRegex =
        /^("(?:[!#-[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z^-\u{10FFFF}])*|\[[!-Z^-\u{10FFFF}]*\])$/u;

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
        // if password is less than 8 characters, show error
        if (password.length < 8) {
            setPasswordTooShort(true);
            return;
        }
        // if email is not valid, show error
        if (!emailRegex.test(email)) {
            setEmailNotvalid(true);
            return;
        }
        // if email is valid and password is at least 8 characters, send email
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/sendVerificationEmail`, { email, password });
        // if email is already registered, show error
        if (res.data.message === 'Email already registered') {
            setEmailAlreadyExists(true);
            return;
        }
        // if email is not registered, send verification email
        if (res.data.message === 'Verification email sent') {
            setVerificationEmailSent(true);
            return;
        }
    };

    // close alerts
    const handleAlertClose = () => {
        setEmailAlreadyExists(false);
        setVerificationEmailSent(false);
        setPasswordTooShort(false);
        setEmailNotvalid(false);
    };

    return (
        <div id='SignupPage' style={{ backgroundColor: 'white', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4' sx={{ mt: '30px', position: 'absolute', pointerEvents: 'none' }}>
                🍀
            </Typography>
            <form autoComplete='off' onSubmit={handleConfirm}>
                <Stack spacing={2} direction='column' textAlign='center' alignItems='center' sx={{ width: '100%', maxWidth: '350px', mt: '250px' }}>
                    <Typography variant='h4' sx={{ fontFamily: 'Noto Sans, sans-serif', letterSpacing: '-1px' }}>
                        <b>Create your account</b>
                    </Typography>
                    <Typography variant='body2' sx={{ fontFamily: 'Noto Sans, sans-serif' }}>
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
                        <Typography variant='body2' sx={{ fontFamily: 'Noto Sans, sans-serif' }}>
                            Already have an account?{' '}
                            <Link color='primary' href='/auth/login' sx={{ textDecoration: 'none' }}>
                                Log in
                            </Link>
                        </Typography>
                    </ThemeProvider>
                </Stack>
            </form>
            <Snackbar open={verificationEmailSent} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='success' variant='filled'>
                    You've been sent a confirmation email. Please check your inbox.
                </Alert>
            </Snackbar>
            <Snackbar open={emailAlreadyExists} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    This email is already registered. Go to{' '}
                    <Link href='/auth/login' sx={{ color: 'white' }}>
                        log in
                    </Link>
                    .
                </Alert>
            </Snackbar>
            <Snackbar open={passwordTooShort} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Password must contain at least 8 characters.
                </Alert>
            </Snackbar>
            <Snackbar open={emailNotvalid} autoHideDuration={8000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity='error' variant='filled'>
                    Please enter a valid email address.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignupPage;
