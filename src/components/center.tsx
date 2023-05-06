import React, { useState, useEffect, useRef } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import PresentationButton from './presentationButton';

const SunIcon = WbSunnyOutlinedIcon;
const BoltIcon = ElectricBoltOutlinedIcon;
const WarningIcon = WarningAmberRoundedIcon;
const DownIcon = ArrowDownwardRoundedIcon;
const Button = PresentationButton;

const Center = (props: { footerHeight: number; setInput: (input: string) => void }) => {
    const scrollDiv = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(true);

    const smoothScrollToBottom = () => {
        if (scrollDiv.current) {
            scrollDiv.current.scrollTo({
                top: scrollDiv.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleDivScroll = (e: any) => {
        const bottom: boolean = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom !== scrolledToBottom) {
            setScrolledToBottom(bottom);
        }
    };

    useEffect(() => {
        if (width < 1000) {
            setScrolledToBottom(false);
        } else {
            setScrolledToBottom(true);
        }
    }, [width]);

    const height = () => {
        if (width > 1000) {
            return 'calc(100% - ' + props.footerHeight + 'px)';
        } else {
            return 'calc(100% - ' + props.footerHeight + 'px - 40px)';
        }
    };

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [width]);

    const handlePresentationButtonClick = (content: string) => {
        props.setInput(content);
    };

    const handleDirection = () => {
        if (width > 1000) {
            return 'row';
        } else {
            return 'column';
        }
    };

    const handleWidth = () => {
        if (width > 1000) {
            return '720px';
        } else {
            return '100%';
        }
    };

    const handleMT = () => {
        if (width < 1000) {
            return '30px';
        } else {
            return '20vh';
        }
    };

    const handleMB = () => {
        if (width > 1000) {
            return '4rem';
        } else {
            return '2.5rem';
        }
    };

    const handleTop = () => {
        if (width > 1000) {
            return '0px';
        } else {
            return '40px';
        }
    };

    return (
        <div
            id='Center'
            ref={scrollDiv}
            onScroll={handleDivScroll}
            style={{ width: '100%', height: height(), display: 'flex', justifyContent: 'center', overflowY: 'auto', position: 'relative', top: handleTop() }}>
            <Stack id='non-active' direction='column' display='flex' alignItems='center' spacing={-1} sx={{ maxWidth: '768px' }}>
                <Typography
                    variant='h4'
                    sx={{ textAlign: 'center', color: 'White', fontFamily: 'Noto Sans, sans-serif', fontWeight: '800', fontSize: '2.25rem', mt: handleMT(), mb: handleMB() }}>
                    LeafGPT
                </Typography>
                <div id='presentation'>
                    <Stack direction={handleDirection()} display='flex' textAlign='center' spacing={2} width={handleWidth()}>
                        <div id='examples' style={{ width: width > 1000 ? 'calc(100% / 3)' : 'auto' }}>
                            {width > 1000 && <SunIcon sx={{ color: 'white' }} />}
                            <Typography
                                variant='h6'
                                sx={{
                                    textAlign: 'center',
                                    color: 'White',
                                    fontFamily: 'Noto Sans, sans-serif',
                                    fontSize: '1rem',
                                    mt: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                {width < 1000 && <SunIcon fontSize='small' sx={{ color: 'white', mr: '5px' }} />} Examples
                            </Typography>
                            <Button handleClick={handlePresentationButtonClick} clickable content='"Explain photosynthesis in simple terms"' />
                            <Button handleClick={handlePresentationButtonClick} clickable content='"Can you recommend some good science books to read?"' />
                            <Button handleClick={handlePresentationButtonClick} clickable content='"Why is typescript better than javascript?"' />
                        </div>
                        <div id='capabilities' style={{ width: width > 1000 ? 'calc(100% / 3)' : 'auto' }}>
                            {width > 1000 && <BoltIcon sx={{ color: 'white' }} />}
                            <Typography
                                variant='h6'
                                sx={{
                                    textAlign: 'center',
                                    color: 'White',
                                    fontFamily: 'Noto Sans, sans-serif',
                                    fontSize: '1rem',
                                    mt: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {width < 1000 && <BoltIcon fontSize='small' sx={{ color: 'white', mr: '5px' }} />} Capabilities
                            </Typography>
                            <Button handleClick={handlePresentationButtonClick} content='Remembers what user said earlier in the conversation' />
                            <Button handleClick={handlePresentationButtonClick} content='Allows user to provide follow-up corrections' />
                            <Button handleClick={handlePresentationButtonClick} content='Trained to decline inappropriate requests 😑' />
                        </div>
                        <div id='limitations' style={{ width: width > 1000 ? 'calc(100% / 3)' : 'auto', marginBottom: '1rem' }}>
                            {width > 1000 && <WarningIcon sx={{ color: 'white' }} />}
                            <Typography
                                variant='h6'
                                sx={{
                                    textAlign: 'center',
                                    color: 'White',
                                    fontFamily: 'Noto Sans, sans-serif',
                                    fontSize: '1rem',
                                    mt: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {width < 1000 && <WarningIcon sx={{ color: 'white', mr: '5px' }} />} Limitations
                            </Typography>
                            <Button handleClick={handlePresentationButtonClick} content='May occasionally generate incorrect information ⚠️' />
                            <Button handleClick={handlePresentationButtonClick} content='May occasionally produce harmful 💥 instructions or biased content ' />
                            <Button handleClick={handlePresentationButtonClick} content='Limited knowledge of world and events after 2021' />
                        </div>
                    </Stack>
                </div>
            </Stack>
            {!scrolledToBottom && (
                <IconButton
                    onClick={smoothScrollToBottom}
                    sx={{
                        position: 'fixed',
                        bottom: `${props.footerHeight + 20}px`,
                        right: '25px',
                        width: '26px',
                        height: '26px',
                        bgcolor: '#545661',
                        border: '1px solid #656770',
                        '&:hover': { bgcolor: '#545661' }
                    }}>
                    <DownIcon fontSize='small' sx={{ color: '#B7B8C3' }} />
                </IconButton>
            )}
        </div>
    );
};

export default Center;
