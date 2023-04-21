/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Avatar } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Footer from '../components/footer';
import SideBar from '../components/sideBar';

const placeholderMessages = [
    { role: 'user', content: 'What is the meaning of life?' },
    {
        role: 'assistant',
        content:
            'The meaning of life is a philosophical and existential question that has puzzled humans for centuries. The answer to this question is subjective and varies depending on individual beliefs and perspectives.Some people believe that the meaning of life is to achieve happiness and fulfill their desires, while others believe that it is to serve a higher purpose or spiritual calling. Some philosophers argue that the meaning of life is to seek knowledge and understanding of the world, while others believe that it is to make a positive impact on society and leave a legacy.Ultimately, the meaning of life is a deeply personal and subjective matter that each individual must discover for themselves. It may be helpful to reflect on your values, passions, and goals, and consider how they align with your sense of purpose and fulfillment.'
    },
    { role: 'user', content: 'Does my wife love me?' },
    {
        role: 'assistant',
        content:
            "As an AI language model, I do not have access to personal or private information about individuals, including your relationship with your wife. It's important to communicate openly and honestly with your wife about your feelings and concerns, and to create a safe and supportive space where you can discuss any issues that may arise in your relationship. Expressing love and affection, demonstrating care and respect, and actively working to build trust and intimacy can help strengthen your relationship and deepen your connection with your partner."
    }
];

const PasteIcon = ContentPasteIcon;

const ChatPage = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>(placeholderMessages);
    const [height, setHeight] = useState<number>(0);
    const [footerHeight, setFooterHeight] = useState<number>(0);

    const handleHeightChange = (height: number) => {
        setFooterHeight(height);
    };

    return (
        <div id='ChatPage' style={{ width: '100%', height: height, display: 'flex', justifyContent: 'center' }}>
            <div id='side' style={{ width: '260px', height: '100%' }}>
                <SideBar />
            </div>
            <div id='main' style={{ width: 'calc(100vw - 260px)', height: '100vh' }}>
                <div id='center' style={{ width: '100%' }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{ backgroundColor: message.role === 'user' ? '#343541' : '#444654', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '45%' }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: message.role === 'user' ? 'white' : '#C8CCD3',
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
                </div>
                <Footer setHeight={handleHeightChange} newInput='' />
            </div>
        </div>
    );
};

export default ChatPage;
