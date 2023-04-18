import React, { useEffect } from 'react';
import '../App.css';
import { Typography, Button, Stack } from '@mui/material';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const auth = useAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth()) {
            navigate('/');
        }
    });
    return (
        <div id='AuthPage' className='centered'>
            <Stack display='flex' justifyContent='center' textAlign='center' sx={{ position: 'relative', bottom: '30px' }}>
                <Typography variant='h3' sx={{ mb: '10px', pointerEvents: 'none' }}>
                    🍀
                </Typography>
                <Typography variant='body2' sx={{ color: 'white', fontFamily: 'Noto Sans', mb: '10px' }}>
                    Welcome to LeafGPT
                </Typography>
                <Typography variant='body2' sx={{ color: 'white', fontFamily: 'Noto Sans', mb: '10px' }}>
                    Log in with your ForestAI account to continue
                </Typography>
                <Stack direction='row' display='flex' justifyContent='center' sx={{ mt: '5px' }}>
                    <Button
                        variant='contained'
                        sx={{ textTransform: 'none', bgcolor: '#00A67E', borderRadius: '0.25rem', height: '35px', ml: '10px', '&:hover': { backgroundColor: '#1A7F64' } }}
                        href='/auth/login'>
                        <Typography variant='body2' sx={{ fontFamily: 'Noto Sans', color: 'white' }}>
                            Log in
                        </Typography>
                    </Button>
                    <Button
                        variant='contained'
                        sx={{ textTransform: 'none', bgcolor: '#00A67E', borderRadius: '0.25rem', height: '35px', ml: '10px', '&:hover': { backgroundColor: '#1A7F64' } }}
                        href='/auth/signup'>
                        <Typography variant='body2' sx={{ fontFamily: 'Noto Sans', color: 'white' }}>
                            Sign up
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
};

export default AuthPage;
