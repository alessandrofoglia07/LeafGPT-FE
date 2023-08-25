import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Stack, Link } from '@mui/material';
import forestTheme from '../forestTheme';
import { ThemeProvider } from '@mui/material/styles';

const VerifyPage = () => {
    const { token } = useParams<string>();
    const [verificationResult, setVerificationResult] = useState<any>(null);

    useEffect(() => {
        if (verificationResult !== null) {
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify/${token}`);
                if (res && res.data) {
                    setVerificationResult(res.data.message);
                } else {
                    setVerificationResult('Something went wrong');
                    throw new Error('Something went wrong');
                }
                return;
            } catch (error: any) {
                setVerificationResult(error.message);
                return;
            }
        };
        verifyEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id='VerifyPage' style={{ width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4' sx={{ mt: '30px', position: 'absolute', pointerEvents: 'none' }}>
                🍀
            </Typography>
            <Stack spacing={2} direction='column' textAlign='center' alignItems='center' sx={{ width: '100%', maxWidth: '350px', mt: '270px' }}>
                {verificationResult ? (
                    <ThemeProvider theme={forestTheme}>
                        <Typography variant='h4' sx={{ fontFamily: 'Noto Sans, sans-serif', letterSpacing: '-1px', width: '350px', mb: '20px' }}>
                            <b>{verificationResult}</b> <br /> <br />
                            <Link href='/auth/login' color='primary' underline='hover'>
                                <b>Log in</b>
                            </Link>
                        </Typography>
                    </ThemeProvider>
                ) : (
                    <Typography variant='h4' sx={{ fontFamily: 'Noto Sans, sans-serif', letterSpacing: '-1px', width: '350px', mb: '20px' }}>
                        <strong>Verifying...</strong>
                    </Typography>
                )}
            </Stack>
        </div>
    );
};

export default VerifyPage;
