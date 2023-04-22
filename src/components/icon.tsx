import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { useAuthUser } from 'react-auth-kit';

const Icon = (props: { role: 'user' | 'assistant' }) => {
    const auth = useAuthUser();

    const [userEmail] = useState<string>(auth()!.email?.[0].toUpperCase());

    const handleSrc = () => {
        if (props.role === 'user') {
            return '';
        } else if (props.role === 'assistant') {
            return '/assets/leafgptIcon.png';
        }
    };

    return (
        <div id='Icon'>
            <Avatar
                sx={{
                    background: props.role === 'user' ? '#3f51b5' : '#f50057',
                    mt: '25px',
                    borderRadius: '5px',
                    width: '30px',
                    height: '30px',
                    mr: '10px'
                }}
                src={handleSrc()}>
                {props.role === 'user' ? userEmail : null}
            </Avatar>
        </div>
    );
};

export default Icon;
