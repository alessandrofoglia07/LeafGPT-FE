import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import SideBar from './sideBar';
import { CSSTransition } from 'react-transition-group';

const Topper = (props: { chatTitle: string }) => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const handleNewChat = () => {
        navigate('/');
    };

    const showMenu = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div>
            <div
                id='Topper'
                style={{
                    position: 'absolute',
                    top: '0px',
                    zIndex: '90',
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
                <IconButton
                    onClick={showMenu}
                    autoFocus
                    sx={{
                        color: 'rgba(217,217,227)',
                        mt: '3px',
                        borderRadius: '5px',
                        '&:focus': { border: '3px solid white ' },
                        '&:active': { border: '3px solid white' },
                        width: '40px',
                        height: '40px'
                    }}>
                    <MenuRoundedIcon />
                </IconButton>
                <Typography variant='h6' sx={{ color: 'rgba(217,217,227)', fontSize: '1rem', mt: '3px' }}>
                    {props.chatTitle}
                </Typography>
                <IconButton
                    onClick={handleNewChat}
                    sx={{
                        color: 'rgba(217,217,227)',
                        mt: '3px',
                        borderRadius: '5px',
                        '&:focus': { border: '3px solid white' },
                        '&:active': { border: '3px solid white' },
                        width: '40px',
                        height: '40px'
                    }}>
                    <AddRoundedIcon />
                </IconButton>
            </div>
            <div id='sidebarMobile'>
                <CSSTransition in={sidebarOpen} timeout={200} classNames={'shadow'} unmountOnExit>
                    <div className='shadow' style={{ position: 'fixed', width: '100vw', height: '100vh', background: '#acacbe', zIndex: '91' }} onClick={showMenu} />
                </CSSTransition>
                <CSSTransition in={sidebarOpen} timeout={200} classNames={'sidebar'} unmountOnExit>
                    <div>
                        <SideBar />
                        <IconButton
                            onClick={showMenu}
                            autoFocus
                            sx={{
                                position: 'fixed',
                                color: 'rgba(217,217,227)',
                                ml: '270px',
                                mt: '10px',
                                borderRadius: '0px',
                                '&:focus': { border: '2px solid white' },
                                '&:active': { border: '2px solid white' },
                                width: '40px',
                                height: '40px',
                                zIndex: '92'
                            }}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
};

export default Topper;
