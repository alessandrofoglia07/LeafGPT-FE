/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton, Stack } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Footer from '../components/footer';
import SideBar from '../components/sideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import io from 'socket.io-client';
import Icon from '../components/icon';

const socket = io('http://localhost:5000');

const PasteIcon = ContentPasteIcon;

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const authHeader = useAuthHeader();

    const scrollableDiv = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<{ author: 'user' | 'assistant'; content: string }[]>([]);
    const [footerHeight, setFooterHeight] = useState<number>(0);
    const [height, setHeight] = useState<string>('calc(100vh - 64px)');

    const handleHeightChange = (footeHeight: number) => {
        setFooterHeight(footeHeight);
    };

    useEffect(() => {
        setHeight(`calc(100vh - ${footerHeight + 64}px)`);
    }, [footerHeight]);

    const getMessages = async () => {
        const res = await axios.get(`http://localhost:5000/api/chat/getMessagesByChatID/${id}`, { headers: { Authorization: authHeader() } });
        const data = res.data;
        setMessages(data);
    };

    // at the beginning, get all messages
    useEffect(() => {
        getMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // when page is loaded, scroll to the bottom of the page
    useEffect(() => {
        if (scrollableDiv.current) {
            scrollableDiv.current.scrollTo(0, scrollableDiv.current.scrollHeight);
        }
    }, [messages]);

    useEffect(() => {
        socket.on('newMessage', (data: { chatID: string }) => {
            if (data.chatID === id) {
                getMessages();
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    return (
        <div id='ChatPage' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div id='side' style={{ width: '260px', height: '100%' }}>
                <SideBar />
            </div>
            <div id='main' style={{ width: 'calc(100vw - 260px)', height: height, overflowY: 'auto' }} ref={scrollableDiv}>
                <div id='center' style={{ width: '100%' }}>
                    <Stack direction='column-reverse' sx={{ width: '100%', height: '100%' }}>
                        {messages.map((message, index) => (
                            <div key={index} style={{ backgroundColor: message.author === 'user' ? '#343541' : '#444654', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Icon role={message.author} />
                                <div style={{ width: '45%' }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: message.author === 'user' ? 'white' : '#C8CCD3',
                                            fontFamily: 'Noto Sans',
                                            fontSize: '0.95rem',
                                            p: '1rem',
                                            lineHeight: '2',
                                            mt: '10px',
                                            mb: '10px'
                                        }}>
                                        {message.content}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </div>
                <Footer setHeight={handleHeightChange} newInput='' />
            </div>
        </div>
    );
};

export default ChatPage;
