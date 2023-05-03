/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton, Stack } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Footer from '../components/footer';
import SideBar from '../components/sideBar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import io from 'socket.io-client';
import Icon from '../components/icon';
import Topper from '../components/topper';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const socket = io('http://localhost:5000');

const PasteIcon = ContentPasteIcon;

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const authHeader = useAuthHeader();
    const navigate = useNavigate();

    const scrollableDiv = useRef<HTMLDivElement>(null);

    /* IMPORTANT: messages are stored from the oldest to the newest
        [0] is the oldest message, [length - 1] is the newest message */
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [footerHeight, setFooterHeight] = useState<number>(0);
    const [height, setHeight] = useState<string>('calc(100vh - 64px)');
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [width]);

    const handleHeightChange = (footeHeight: number) => {
        setFooterHeight(footeHeight);
    };

    useEffect(() => {
        if (width > 1000) {
            setHeight('calc(100% - ' + footerHeight + 'px)');
        } else {
            setHeight('calc(100% - ' + footerHeight + 'px - 40px)');
        }
    }, [footerHeight, width]);

    const getMessages = async () => {
        const res = await axios.get(`http://localhost:5000/api/chat/getMessagesByChatID/${id}`, { headers: { Authorization: authHeader() } });
        const data = res.data;
        setMessages(data.reverse());
    };

    // at the beginning, get all messages
    useEffect(() => {
        getMessages();
    }, []);

    const getTitle = async () => {
        const res = await axios.get(`http://localhost:5000/api/chat/getChatTitleByID/${id}`, { headers: { Authorization: authHeader() } });
        const data = res.data;
        if (data === 'Chat not found') {
            navigate('/');
        }
        setTitle(data);
    };

    useEffect(() => {
        setTimeout(() => {
            getTitle();
        }, 100);
        if (title !== document.title) {
            document.title = title;
        }
    }, [title]);

    // when page is loaded, scroll to the bottom of the page
    useEffect(() => {
        if (scrollableDiv.current) {
            scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
            setTimeout(() => {
                if (scrollableDiv.current) {
                    scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
                }
            }, 100);
        }
    }, [messages, width]);

    useEffect(() => {
        socket.on('newMessage', (data: { chatID: string }) => {
            if (data.chatID === id) {
                getMessages();
            }
        });

        socket.on('chatgptResChunk', (data: { chatID: string; content: string }) => {
            if (data.chatID === id) {
                setMessages((messages) => {
                    if (messages[messages.length - 1]?.role === 'user') {
                        return [...messages, { role: 'assistant', content: data.content }];
                    }
                    return [...messages.slice(0, -1), { role: 'assistant', content: data.content }];
                });
            }
        });
    }, [socket]);

    const getLanguage = (codeBlock: string) => {
        const language = hljs.highlightAuto(codeBlock || '').language;
        return language;
    };

    useEffect(() => {
        hljs.highlightAll();
    }, [messages, socket]);

    const handleWidthSide = () => {
        if (width < 1000) {
            return '0px';
        } else {
            return '260px';
        }
    };

    const handleWidthMain = () => {
        if (width < 1000) {
            return '100vw';
        } else {
            return 'calc(100vw - 260px)';
        }
    };

    const handleMessageWidth = () => {
        if (width < 1000) {
            return 'calc(100% - 40px)';
        } else {
            return '45%';
        }
    };

    return (
        <div id='ChatPage' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div id='side' style={{ width: handleWidthSide(), height: '100%' }}>
                {width > 1000 && <SideBar activeChat={title} />}
            </div>
            {width < 1000 && <Topper chatTitle={title} />}
            <div id='main' style={{ width: handleWidthMain(), height: height, overflowY: 'auto', marginTop: width > 1000 ? '' : '40px' }} ref={scrollableDiv}>
                <div id='center' style={{ width: '100%' }}>
                    <Stack direction='column' sx={{ width: '100%', height: '100%' }}>
                        {messages.map((message, index) => {
                            if (message.role === 'assistant' && message.content.includes('\n' || '```' || '`')) {
                                const content: string[] = message.content.split('\n' || '```');
                                let code: boolean = false;
                                let codeBlock: string[] = [];
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: '#444654',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <Icon role={message.role} />
                                        <div style={{ width: handleMessageWidth(), marginBottom: '15px', marginTop: '15px' }}>
                                            {content.map((line, index) => {
                                                if (line.includes('```')) {
                                                    code = !code;
                                                    if (code) {
                                                        codeBlock = [];
                                                        return (
                                                            // code block start
                                                            <Typography
                                                                key={index}
                                                                variant='body1'
                                                                sx={{
                                                                    color: '#343541',
                                                                    fontFamily: 'Noto Sans',
                                                                    fontSize: '0.95rem',
                                                                    lineHeight: '2',
                                                                    mt: '20px',
                                                                    backgroundColor: '#343541',
                                                                    borderTopLeftRadius: '7px',
                                                                    borderTopRightRadius: '7px',
                                                                    pointerEvents: 'none',
                                                                    userSelect: 'none',
                                                                    WebkitUserSelect: 'none',
                                                                    MozUserSelect: 'none',
                                                                    msUserSelect: 'none',
                                                                    mr: '1rem'
                                                                }}>
                                                                .
                                                            </Typography>
                                                        );
                                                    } else {
                                                        const codeBlockString = codeBlock.join('\n');
                                                        return (
                                                            // code block end
                                                            <div key={index}>
                                                                <Typography
                                                                    variant='body1'
                                                                    component={'pre'}
                                                                    sx={{
                                                                        color: '#D1D5D2',
                                                                        fontSize: '1rem',
                                                                        lineHeight: '1.4',
                                                                        bgcolor: 'black',
                                                                        paddingTop: '0.25rem',
                                                                        overflowX: 'auto',
                                                                        pl: '1rem',
                                                                        pr: '1rem',
                                                                        maxWidth: '100%',
                                                                        mr: '1rem',
                                                                        mb: '30px',
                                                                        borderBottomLeftRadius: '7px',
                                                                        borderBottomRightRadius: '7px',
                                                                        letterSpacing: '-0.2px'
                                                                    }}>
                                                                    <code
                                                                        className={`language-${getLanguage(codeBlockString)}`}
                                                                        style={{ backgroundColor: 'black', maxWidth: '100%', height: '100%' }}>
                                                                        {codeBlockString}
                                                                    </code>
                                                                </Typography>
                                                            </div>
                                                        );
                                                    }
                                                } else {
                                                    if (code) {
                                                        codeBlock.push(line);
                                                    } else {
                                                        return (
                                                            // normal line
                                                            <Typography
                                                                key={index}
                                                                variant='body1'
                                                                sx={{
                                                                    color: '#D1D5D2',
                                                                    fontFamily: 'Noto Sans',
                                                                    fontSize: '0.95rem',
                                                                    lineHeight: '1.8',
                                                                    pl: '1rem',
                                                                    maxWidth: '100%'
                                                                }}>
                                                                {line}
                                                            </Typography>
                                                        );
                                                    }
                                                }
                                            })}
                                        </div>
                                        {width > 1000 && (
                                            <IconButton
                                                onClick={() => {
                                                    navigator.clipboard.writeText(message.content);
                                                }}
                                                sx={{ color: '#7F7F90', mt: '26px', width: '25px', height: '25px', borderRadius: '7px', '&:hover': { color: '#D9D9E3' } }}>
                                                <PasteIcon sx={{ fontSize: '15px' }} />
                                            </IconButton>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: message.role === 'user' ? '#343541' : '#444654', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Icon role={message.role} />
                                        <div style={{ width: handleMessageWidth() }}>
                                            <Typography
                                                variant='body1'
                                                sx={{
                                                    color: message.role === 'user' ? 'white' : '#D1D5D2',
                                                    fontFamily: 'Noto Sans',
                                                    fontSize: '0.95rem',
                                                    p: '1rem',
                                                    lineHeight: '2',
                                                    mt: '10px',
                                                    mb: '10px',
                                                    maxWidth: '100%'
                                                }}>
                                                {message.content}
                                            </Typography>
                                        </div>
                                        {width > 1000 && (
                                            <IconButton
                                                onClick={() => {
                                                    navigator.clipboard.writeText(message.content);
                                                }}
                                                sx={{ color: '#7F7F90', mt: '26px', width: '25px', height: '25px', borderRadius: '7px', '&:hover': { color: '#D9D9E3' } }}>
                                                <PasteIcon sx={{ fontSize: '15px' }} />
                                            </IconButton>
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </Stack>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Footer setHeight={handleHeightChange} newInput='' />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
