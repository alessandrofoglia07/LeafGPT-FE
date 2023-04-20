import React from 'react';

const Center = (props: { footerHeight: number }) => {
    const height = 'calc(100% - ' + props.footerHeight + 'px)';

    return (
        <div id='Center' style={{ width: '100%', height: height, display: 'flex' }}>
            <h1>Center</h1>
        </div>
    );
};

export default Center;
