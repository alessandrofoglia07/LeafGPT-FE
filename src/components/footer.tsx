/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Typography, TextField, IconButton, Stack } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
    maxWidth: '768px',
    width: '90%',
    height: '50px',
    backgroundColor: '#40414F',
    borderRadius: '5px',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#303038' // border color
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#303038' // keep border color the same
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'inherit' // keep label color the same
    }
}));

const Footer = () => {
    const [input, setInput] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            handleSubmit();
        } else if (e.key === 'Enter' && e.shiftKey === true) {
            setInput(input + '\n');
        } else {
            return;
        }
    };

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setTimeout(() => setInput(''), 1);
    };

    return (
        <div id='Footer' style={{ position: 'absolute', bottom: '0px', width: 'calc(100vw - 260px)' }}>
            <form autoComplete='off' style={{ width: '100%', height: '100%', display: 'flex' }} onSubmit={handleSubmit}>
                <Stack direction='column' display='flex' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                    <TextField
                        id='input'
                        placeholder='Send a message...'
                        variant='outlined'
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleEnter}
                        sx={{
                            maxWidth: '768px',
                            width: '90%',
                            position: 'relative',
                            backgroundColor: '#40414F',
                            borderRadius: '5px',
                            color: 'white',
                            minHeight: '46px',
                            fontFamily: 'Noto Sans',
                            mb: '10px',
                            mt: '10px',
                            boxShadow: '0px 0px 1px 1px #343541',
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 'inherit'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 'inherit'
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '16px',
                                lineHeight: '1'
                            }
                        }}
                        InputProps={{
                            style: {
                                color: 'white'
                            },
                            endAdornment: (
                                <IconButton
                                    type='submit'
                                    sx={{
                                        color: '#5A5B6B',
                                        position: 'absolute',
                                        bottom: '9px',
                                        right: '15px',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '10px',
                                        '&:hover': { backgroundColor: '#202123' }
                                    }}>
                                    <SendOutlinedIcon fontSize='small' />
                                </IconButton>
                            )
                        }}
                        multiline
                    />
                    <Typography variant='body2' sx={{ color: '#929398', fontFamily: 'Noto Sans', fontSize: '12px', mb: '10px' }}>
                        Free Research Preview. LeafGPT may produce inaccurate information about people, places, or facts.
                    </Typography>
                </Stack>
            </form>
        </div>
    );
};

export default Footer;
