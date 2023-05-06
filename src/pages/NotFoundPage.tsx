import React, { useEffect } from 'react';
import { Typography, Stack } from '@mui/material';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = '404: This page could not be found.';
    }, []);

    return (
        <div id='NotFoundPage' style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction='row'>
                <Typography variant='h5' sx={{ fontFamily: 'Noto Sans, sans-serif', color: 'white', borderRight: '1px solid #71727A', pr: '20px', height: '50px', lineHeight: '50px' }}>
                    404
                </Typography>
                <Typography variant='body2' sx={{ fontFamily: 'Noto Sans, sans-serif', color: 'white', pl: '20px', height: '50px', lineHeight: '50px' }}>
                    This page could not be found.
                </Typography>
            </Stack>
        </div>
    );
};

export default NotFoundPage;
