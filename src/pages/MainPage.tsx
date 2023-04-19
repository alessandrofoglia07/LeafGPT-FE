import React from 'react';
import SideBar from '../components/sideBar';
import Footer from '../components/footer';

const MainPage = () => {
    return (
        <div id='MainPage' style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <div id='side' style={{ width: '260px', height: '100%' }}>
                <SideBar />
            </div>
            <div id='main'>
                <div id='mainPage'></div>
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;
