import React from 'react';
import SideBar from '../components/sideBar';
import Footer from '../components/footer';
import Center from '../components/center';

const MainPage = () => {
    return (
        <div id='MainPage' style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <div id='side' style={{ width: '260px', height: '100%' }}>
                <SideBar />
            </div>
            <div id='main' style={{ width: 'calc(100vw - 260px)', height: '100vh' }}>
                <Center />
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;
