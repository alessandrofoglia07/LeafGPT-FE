import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { ThemeProvider } from '@mui/material/styles';
import forestTheme from '../forestTheme';
import axios from 'axios';
import { useAuthHeader, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const SideBar = () => {
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const signOut = useSignOut();

    const [chats, setChats] = useState<any[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

    useEffect(() => {
        const getChats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/chat/getChats', { headers: { Authorization: authHeader() } });
                setChats(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        socket.on('updatedChats', () => {
            getChats();
        });
        getChats();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const handleNewChat = () => {
        navigate('/');
    };

    const handleLogOut = () => {
        signOut();
    };

    const handleClearConversations = async () => {
        if (!deleteConfirmation) {
            setDeleteConfirmation(true);
            return;
        } else {
            setDeleteConfirmation(false);
            await axios.delete('http://localhost:5000/api/chat/deleteAllChatsByUserID', { headers: { Authorization: authHeader() } });
            navigate('/');
        }
    };

    return (
        <div id='SideBar'>
            <AppBar position='static' sx={{ bgcolor: '#202123', height: '100vh', width: '260px' }}>
                <Toolbar sx={{ width: '100%', height: '100%', position: 'relative', right: '25px' }}>
                    <Stack direction='column' display='flex' alignItems='center' spacing={2} sx={{ width: '100%', height: '100%' }}>
                        <ThemeProvider theme={forestTheme}>
                            <Button
                                variant='outlined'
                                color='info'
                                sx={{
                                    textTransform: 'none',
                                    height: '46px',
                                    width: '244px',
                                    mt: '10px',
                                    borderRadius: '5px',
                                    borderColor: '#555559'
                                }}
                                onClick={handleNewChat}>
                                <AddIcon fontSize='small' sx={{ position: 'relative', right: '70px', bottom: '1px' }} />
                                <Typography sx={{ fontSize: '0.83rem', fontFamily: 'Noto Sans', position: 'relative', right: '60px' }}>New chat</Typography>
                            </Button>
                            <div style={{ marginTop: '10px', overflowY: 'auto', height: 'calc(100% - 179px)' }}>
                                {chats.map((chat) => (
                                    <Button
                                        key={chat._id}
                                        variant='text'
                                        color='info'
                                        sx={{ textTransform: 'none', height: '46px', width: '244px', mb: '5px', borderRadius: '5px', justifyContent: 'left', ml: '7px' }}
                                        startIcon={<ChatBubbleOutlineRoundedIcon fontSize='small' sx={{ ml: '7px' }} />}
                                        href={`/c/${chat._id}`}>
                                        <Typography sx={{ fontSize: '0.83rem', fontFamily: 'Noto Sans' }}>{chat.title}</Typography>
                                    </Button>
                                ))}
                            </div>
                            <div style={{ position: 'absolute', bottom: '0px', borderTop: '1px solid #4D4D4F', right: '23px' }}>
                                {!deleteConfirmation ? (
                                    <Button
                                        variant='text'
                                        color='info'
                                        sx={{ textTransform: 'none', height: '46px', width: '244px', mb: '5px', borderRadius: '5px', justifyContent: 'left', ml: '25px', mt: '5px' }}
                                        startIcon={<DeleteOutlinedIcon fontSize='small' sx={{ ml: '7px' }} />}
                                        onClick={handleClearConversations}>
                                        <Typography sx={{ fontSize: '0.83rem', fontFamily: 'Noto Sans' }}>Clear conversations</Typography>
                                    </Button>
                                ) : (
                                    <Button
                                        variant='text'
                                        color='info'
                                        sx={{ textTransform: 'none', height: '46px', width: '244px', mb: '5px', borderRadius: '5px', justifyContent: 'left', ml: '25px', mt: '5px' }}
                                        startIcon={<CheckRoundedIcon fontSize='small' sx={{ ml: '7px' }} />}
                                        onClick={handleClearConversations}>
                                        <Typography sx={{ fontSize: '0.83rem', fontFamily: 'Noto Sans' }}>Confirm clear conversations</Typography>
                                    </Button>
                                )}

                                <Button
                                    variant='text'
                                    color='info'
                                    sx={{ textTransform: 'none', height: '46px', width: '244px', mb: '10px', borderRadius: '5px', justifyContent: 'left', ml: '25px' }}
                                    startIcon={<LogoutRoundedIcon fontSize='small' sx={{ ml: '11px' }} />}
                                    onClick={handleLogOut}>
                                    <Typography sx={{ fontSize: '0.83rem', fontFamily: 'Noto Sans' }}>Log out</Typography>
                                </Button>
                            </div>
                        </ThemeProvider>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default SideBar;
