import React, { useState, useEffect } from 'react';
import SideBar from '../components/sideBar';
import Footer from '../components/footer';
import Center from '../components/center';
import Topper from '../components/topper';
import ApiKey from '../utils/apiKey';
import Modal from '../components/apiKeyModal';

const MainPage = () => {
    const [footerHeight, setFooterHeight] = useState<number>(0);
    const [newInput, setNewInput] = useState<string>('');
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [open, setOpen] = useState<boolean>(!ApiKey.get());

    useEffect(() => {
        document.title = 'New chat';
    }, []);

    const handleHeightChange = (height: number) => {
        setFooterHeight(height);
    };

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [width]);

    const setInput = (input: string) => {
        setNewInput(input);
        setTimeout(() => setNewInput(''), 1);
    };

    const handleWidth = () => {
        if (width > 1000) {
            return '260px';
        } else {
            return '0px';
        }
    };

    const handleMainWidth = () => {
        if (width > 1000) {
            return 'calc(100vw - 260px)';
        } else {
            return '100vw';
        }
    };

    return (
        <div id='MainPage' style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <div id='side' style={{ width: handleWidth(), height: '100%' }}>
                {width > 1000 && <SideBar />}
            </div>
            <div id='main' style={{ width: handleMainWidth(), height: '100vh', display: 'flex', justifyContent: 'center' }}>
                {width < 1000 && <Topper chatTitle='New chat' />}
                <Center setInput={setInput} footerHeight={footerHeight} />
                <Footer setHeight={handleHeightChange} newInput={newInput} openModal={() => setOpen(true)} />
                <Modal open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default MainPage;
