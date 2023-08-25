import React, { useState } from 'react';
import { Modal as MuiModal, Box, Typography, TextField, Button, ThemeProvider } from '@mui/material';
import forestTheme from '../forestTheme';
import ApiKey from '../utils/apiKey';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Modal: React.FC<Props> = ({ open, setOpen }: Props) => {
    const [apiKey, setApiKeyState] = useState<string>(ApiKey.get() || '');

    const setApiKey = () => {
        if (apiKey === '') {
            ApiKey.clear();
        } else {
            ApiKey.set(apiKey);
        }
        setOpen(false);
    };

    return (
        <MuiModal open={open} onClose={() => setOpen(false)} aria-labelledby='api-key-modal' aria-describedby='modal-requesting-api-key-from-user'>
            <ThemeProvider theme={forestTheme}>
                <Box
                    sx={{
                        width: 'max-content',
                        height: 'max-content',
                        bgcolor: '#343541',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        p: 4
                    }}>
                    <Typography sx={{ fontFamily: 'Noto Sans, sans-serif', width: '90%', mb: '20px', color: 'white', fontSize: '1.1rem' }}>
                        To use LeafGPT, you need an OpenAI API key.
                        <br />
                        <br /> You can get one{' '}
                        <a href='https://beta.openai.com/' style={{ color: 'white' }} target='_blank' rel='noreferrer'>
                            here
                        </a>
                        .<br />
                        <br /> This will only be stored in your browser.
                    </Typography>
                    <form autoComplete='off' autoCorrect='off' onSubmit={setApiKey} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            type='text'
                            id='input'
                            value={apiKey}
                            onChange={(e) => setApiKeyState(e.target.value)}
                            autoFocus
                            placeholder='API key'
                            variant='outlined'
                            sx={{
                                maxWidth: '768px',
                                width: '90%',
                                position: 'relative',
                                backgroundColor: '#40414F',
                                borderRadius: '5px',
                                color: 'white',
                                minHeight: '46px',
                                fontFamily: 'Noto Sans, sans-serif',
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
                                    lineHeight: '1',
                                    width: 'calc(100% - 40px)'
                                }
                            }}
                            inputProps={{
                                style: {
                                    color: 'white'
                                }
                            }}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            sx={{ width: '90%', height: '50px', top: '10px', textTransform: 'none', fontSize: '1.3rem', mb: '20px' }}>
                            Confirm
                        </Button>
                    </form>
                </Box>
            </ThemeProvider>
        </MuiModal>
    );
};

export default Modal;
