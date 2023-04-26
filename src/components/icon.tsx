import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useAuthUser } from 'react-auth-kit';

const Icon = (props: { role: 'user' | 'assistant' }) => {
    const auth = useAuthUser();

    const [userEmail] = useState<string>(auth()!.email?.[0].toUpperCase());
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [width]);

    const handleSrc = () => {
        if (props.role === 'user') {
            return '';
        } else if (props.role === 'assistant') {
            return '/assets/leafgptIcon.png';
        }
    };

    const handleMR = () => {
        if (width > 1000) {
            return '10px';
        } else {
            return '0px';
        }
    };

    const handleML = () => {
        if (width > 1000) {
            return '0px';
        } else {
            return '10px';
        }
    };

    return (
        <div id='Icon'>
            <Avatar
                sx={{
                    background: props.role === 'user' ? '#3f51b5' : 'null',
                    mt: '25px',
                    borderRadius: '5px',
                    width: '30px',
                    height: '30px',
                    mr: handleMR(),
                    ml: handleML()
                }}
                src={handleSrc()}>
                {props.role === 'user' ? userEmail : null}
            </Avatar>
        </div>
    );
};

export default Icon;
