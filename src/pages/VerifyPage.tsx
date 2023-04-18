import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

const VerifyPage = () => {
    const { token } = useParams();
    const [verificationResult, setVerificationResult] = useState<any>(null);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (verificationResult) return;
                const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
                console.log(res.data.message);
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
    }, [token]);

    return (
        <div id='VerifyPage'>
            {verificationResult ? (
                <Typography variant='h1' align='center' sx={{ mt: 30, fontFamily: 'Noto Sans', color: 'white' }}>
                    <strong>{verificationResult}</strong>
                </Typography>
            ) : (
                <Typography variant='h1' align='center' sx={{ mt: 30, fontFamily: 'Noto Sans', color: 'white' }}>
                    <strong>Verifying...</strong>
                </Typography>
            )}
        </div>
    );
};

export default VerifyPage;
