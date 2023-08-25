/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton, Stack } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import Footer from '../components/footer';
import SideBar from '../components/sideBar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import io from 'socket.io-client';
import Icon from '../components/icon';
import Topper from '../components/topper';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';
import lua from 'highlight.js/lib/languages/lua';
import ruby from 'highlight.js/lib/languages/ruby';
import r from 'highlight.js/lib/languages/r';
import go from 'highlight.js/lib/languages/go';
import c from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/atom-one-dark.css';
import Modal from '../components/apiKeyModal';
import ApiKey from '../utils/apiKey';

const socket = io(process.env.REACT_APP_API_URL as string);

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('php', php);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('r', r);
hljs.registerLanguage('go', go);
hljs.registerLanguage('c', c);

const PasteIcon = ContentPasteIcon;
const DownIcon = ArrowDownwardRoundedIcon;

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const authHeader = useAuthHeader();
    const navigate = useNavigate();

    const scrollDiv = useRef<HTMLDivElement>(null);

    /* IMPORTANT: messages are stored from the oldest to the newest
        [0] is the oldest message, [length - 1] is the newest message */
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [footerHeight, setFooterHeight] = useState<number>(0);
    const [height, setHeight] = useState<string>('calc(100vh - 64px)');
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [title, setTitle] = useState<string>('');
    const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(!ApiKey.get());

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/getMessagesByChatID/${id}`, { headers: { Authorization: authHeader() } });
        const data = res.data;
        setMessages(data.reverse());
    };

    // at the beginning, get all messages
    useEffect(() => {
        getMessages();
    }, []);

    const getTitle = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/getChatTitleByID/${id}`, { headers: { Authorization: authHeader() } });
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

    const scrollToBottom = () => {
        if (scrollDiv.current) {
            scrollDiv.current.scrollTo({
                top: scrollDiv.current.scrollHeight,
                behavior: 'auto'
            });
            setTimeout(() => {
                if (scrollDiv.current) {
                    scrollDiv.current.scrollTo({
                        top: scrollDiv.current.scrollHeight,
                        behavior: 'auto'
                    });
                }
            }, 100);
        }
    };

    const smoothScrollToBottom = () => {
        if (scrollDiv.current) {
            scrollDiv.current.scrollTo({
                top: scrollDiv.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleDivScroll = (e: any) => {
        const bottom: boolean = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom !== scrolledToBottom) {
            setScrolledToBottom(bottom);
        }
    };

    // when page is loaded, scroll to the bottom of the page
    useEffect(() => {
        scrollToBottom();
    }, [width]);

    useEffect(() => {
        socket.on('newMessage', (data: { chatID: string }) => {
            if (data.chatID === id) {
                getMessages();
            }
        });

        socket.on('chatgptResChunk', (data: { chatID: string; content: string }) => {
            if (data.chatID === id) {
                setMessages((messages) => {
                    if (scrolledToBottom) {
                        scrollToBottom();
                    }
                    if (messages[messages.length - 1]?.role === 'user') {
                        return [...messages, { role: 'assistant', content: data.content }];
                    }
                    return [...messages.slice(0, -1), { role: 'assistant', content: data.content }];
                });
            }
        });

        socket.on('resError', (data: { chatID: string; error: unknown }) => {
            if (data.chatID === id) {
                setMessages((messages) => {
                    if (scrolledToBottom) {
                        scrollToBottom();
                    }
                    if (messages[messages.length - 1]?.role === 'user') {
                        return [...messages, { role: 'assistant', content: 'Error: ' + data.error }];
                    }
                    return [...messages.slice(0, -1), { role: 'assistant', content: 'Error: ' + data.error }];
                });
            }
        });
    }, [socket]);

    const getLanguage = (codeBlock: string) => {
        const language = hljs.highlightAuto(codeBlock || '').language;
        return language;
    };

    const getLanguageTitle = (codeBlock: string) => {
        const language = hljs.highlightAuto(codeBlock || '').language;
        switch (language) {
            case 'javascript':
                return 'js';
            case 'typescript':
                return 'ts';
            case 'cpp':
                return 'c++';
            case 'csharp':
                return 'c#';
            case 'xml':
                return 'html';
            default:
                return language;
        }
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

    /** 
    This accepts: 
    ** import React from 'react';
    ** import { useState } from 'react';
    ** import React, { useState } from 'react';
    */
    const reactRegex = /^import\s+\w+|\{.+?\}\s+from\s+'react'(;)?$/gm;

    return (
        <div id='ChatPage' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div id='side' style={{ width: handleWidthSide(), height: '100%' }}>
                {width > 1000 && <SideBar activeChat={title} />}
            </div>
            {width < 1000 && <Topper chatTitle={title} />}
            <div id='main' style={{ width: handleWidthMain(), height: height, overflowY: 'auto', marginTop: width > 1000 ? '' : '40px' }} ref={scrollDiv} onScroll={handleDivScroll}>
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
                                                    } else {
                                                        const codeBlockString = codeBlock.join('\n').replace(/\t/g, '    ');

                                                        let languageTitle = getLanguageTitle(codeBlockString);
                                                        if ((languageTitle === 'js' || languageTitle === 'html') && codeBlockString.match(reactRegex)) {
                                                            languageTitle = 'jsx';
                                                        } else if (languageTitle === 'ts' && codeBlockString.match(reactRegex)) {
                                                            languageTitle = 'tsx';
                                                        }

                                                        return (
                                                            // code block
                                                            <div key={index}>
                                                                <Typography
                                                                    key={index}
                                                                    variant='body1'
                                                                    sx={{
                                                                        color: '#D1D5D2',
                                                                        fontFamily: 'Noto Sans, sans-serif',
                                                                        fontSize: '0.75rem',
                                                                        lineHeight: '2.5',
                                                                        mt: '20px',
                                                                        backgroundColor: '#343541',
                                                                        borderTopLeftRadius: '7px',
                                                                        borderTopRightRadius: '7px',
                                                                        mr: '1rem',
                                                                        pl: '1rem',
                                                                        pr: '1rem'
                                                                    }}>
                                                                    {languageTitle}
                                                                </Typography>
                                                                <Typography
                                                                    variant='body1'
                                                                    component={'pre'}
                                                                    sx={{
                                                                        color: '#D1D5D2',
                                                                        fontSize: '0.85rem',
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
                                                                        style={{ backgroundColor: 'black', maxWidth: '100%', height: '100%', fontFamily: 'FireCode' }}>
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
                                                                    fontFamily: 'Noto Sans, sans-serif',
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
                                                    fontFamily: 'Noto Sans, sans-serif',
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
                    {!scrolledToBottom && (
                        <IconButton
                            onClick={smoothScrollToBottom}
                            sx={{
                                position: 'fixed',
                                bottom: `${footerHeight + 20}px`,
                                right: '25px',
                                width: '26px',
                                height: '26px',
                                bgcolor: '#545661',
                                border: '1px solid #656770',
                                '&:hover': { bgcolor: '#545661' }
                            }}>
                            <DownIcon fontSize='small' sx={{ color: '#B7B8C3' }} />
                        </IconButton>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Footer
                        setHeight={handleHeightChange}
                        newInput=''
                        openModal={() =>
                            setTimeout(() => {
                                setOpen(true);
                            }, 200)
                        }
                    />
                </div>
                <Modal open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default ChatPage;
