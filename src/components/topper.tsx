import React from 'react';
import { Typography, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useNavigate } from 'react-router-dom';

const Topper = (props: { chatTitle: string }) => {
    const navigate = useNavigate();

    const handleNewChat = () => {
        navigate('/');
    };

    const showMenu = () => {
        console.log('show menu');
    };

    return (
        <div
            id='Topper'
            style={{
                position: 'absolute',
                top: '0px',
                zIndex: '100',
                height: '40px',
                backgroundColor: '#343541',
                width: '100vw',
                display: 'flex',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: 'hsla(0,0%,100%,.2)',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <IconButton onClick={showMenu} sx={{ color: 'rgba(217,217,227)', mt: '3px', borderRadius: '5px', '&:focus': { border: '3px solid white ' }, width: '40px', height: '40px' }}>
                <MenuRoundedIcon />
            </IconButton>
            <Typography variant='h6' sx={{ color: 'rgba(217,217,227)', fontSize: '1rem', mt: '3px' }}>
                {props.chatTitle}
            </Typography>
            <IconButton
                onClick={handleNewChat}
                sx={{ color: 'rgba(217,217,227)', mt: '3px', borderRadius: '5px', '&:focus': { border: '3px solid white' }, width: '40px', height: '40px' }}>
                <AddRoundedIcon />
            </IconButton>
        </div>
    );
};

export default Topper;
