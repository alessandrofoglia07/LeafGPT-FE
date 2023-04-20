import React from 'react';
import SideBar from '../components/sideBar';
import Footer from '../components/footer';
import Center from '../components/center';

const MainPage = () => {
    const [footerHeight, setFooterHeight] = React.useState<number>(0);

    const handleHeightChange = (height: number) => {
        setFooterHeight(height);
    };

    return (
        <div id='MainPage' style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <div id='side' style={{ width: '260px', height: '100%' }}>
                <SideBar />
            </div>
            <div id='main' style={{ width: 'calc(100vw - 260px)', height: '100vh' }}>
                <Center footerHeight={footerHeight} />
                <Footer setHeight={handleHeightChange} />
            </div>
        </div>
    );
};

export default MainPage;
