import React from 'react';
import { Button, Typography } from '@mui/material';

const PresentationButton = (props: { content: string; clickable?: boolean; handleClick?: (content: string) => void }) => {
    const sx = () => {
        if (props.clickable) {
            return {
                bgcolor: '#3E3F4B',
                '&:hover': { bgcolor: '#202123' },
                boxShadow: '0px 0px 1px 1px #343541',
                maxWidth: '28rem',
                width: '100%',
                mt: '15px'
            };
        } else {
            return {
                bgcolor: '#3E3F4B',
                '&:hover': { bgcolor: '#3E3F4B' },
                pointerEvents: 'none',
                boxShadow: '0px 0px 1px 1px #343541',
                maxWidth: '28rem',
                width: '100%',
                mt: '15px'
            };
        }
    };

    const handleClick = () => {
        if (props.clickable === undefined) props.clickable = false;
        if (!props.clickable) return;
        if (!props.handleClick) return;
        props.handleClick(props.content);
    };

    return (
        <div id='PresentationButton'>
            <Button variant='contained' sx={sx()} onClick={handleClick}>
                <Typography
                    variant='h6'
                    sx={{
                        padding: '0.7rem 0rem',
                        fontFamily: 'Noto Sans',
                        fontSize: '0.8rem',
                        lineHeight: '1.25rem',
                        textTransform: 'none'
                    }}>
                    {props.content}
                </Typography>
            </Button>
        </div>
    );
};

export default PresentationButton;
