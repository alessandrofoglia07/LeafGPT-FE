import React from 'react';
import SideBar from '../components/sideBar';
import Footer from '../components/footer';
import Center from '../components/center';

const MainPage = () => {
    const [footerHeight, setFooterHeight] = React.useState<number>(0);
    const [newInput, setNewInput] = React.useState<string>('');

    const handleHeightChange = (height: number) => {
        setFooterHeight(height);
    };

    const setInput = (input: string) => {
        setNewInput(input);
        setTimeout(() => setNewInput(''), 1);
    };

    return (
        <div id='MainPage' style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <div id='side' style={{ width: '260px', height: '100%' }}>
                <SideBar />
            </div>
            <div id='main' style={{ width: 'calc(100vw - 260px)', height: '100vh' }}>
                <Center setInput={setInput} footerHeight={footerHeight} />
                <Footer setHeight={handleHeightChange} newInput={newInput} />
            </div>
        </div>
    );
};

export default MainPage;
