import React, { useEffect } from 'react';
import SideBar from '../components/sideBar';
import Footer from '../components/footer';
import Center from '../components/center';

const MainPage = () => {
    const [footerHeight, setFooterHeight] = React.useState<number>(0);
    const [newInput, setNewInput] = React.useState<string>('');
    const [width, setWidth] = React.useState<number>(window.innerWidth);

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
                <Center setInput={setInput} footerHeight={footerHeight} />
                <Footer setHeight={handleHeightChange} newInput={newInput} />
            </div>
        </div>
    );
};

export default MainPage;
