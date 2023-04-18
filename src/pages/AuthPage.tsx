import React from 'react';
import '../App.css';
import { Typography, Button, Stack } from '@mui/material';

const AuthPage = () => {
    return (
        <div id='AuthPage' className='centered'>
            <Stack display='flex' justifyContent='center' textAlign='center' sx={{ position: 'relative', bottom: '30px' }}>
                <Typography variant='h3'>🍀</Typography>
                <Typography variant='body2' className='typographyAuthPage'>
                    Welcome to LeafGPT
                </Typography>
                <Typography variant='body2' className='typographyAuthPage'>
                    Log in with your ForestAI account to continue
                </Typography>
                <Stack direction='row' display='flex' justifyContent='center' sx={{ mt: '15px' }}>
                    <Button variant='contained' className='btnAuthPage'>
                        <Typography variant='body2' className='typographyAuthPageBtn'>
                            Log in
                        </Typography>
                    </Button>
                    <Button variant='contained' className='btnAuthPage'>
                        <Typography variant='body2' className='typographyAuthPageBtn'>
                            Sign up
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
};

export default AuthPage;
