/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import PresentationButton from './presentationButton';

const SunIcon = WbSunnyOutlinedIcon;
const BoltIcon = ElectricBoltOutlinedIcon;
const WarningIcon = WarningAmberRoundedIcon;
const Button = PresentationButton;

const Center = (props: { footerHeight: number; setInput: (input: string) => void }) => {
    const height = 'calc(100% - ' + props.footerHeight + 'px)';

    const handlePresentationButtonClick = (content: string) => {
        props.setInput(content);
    };

    return (
        <div id='Center' style={{ width: '100%', height: height, display: 'flex', justifyContent: 'center' }}>
            <Stack direction='column' display='flex' alignItems='center' spacing={-1} sx={{ maxWidth: '768px' }}>
                <Typography variant='h4' sx={{ textAlign: 'center', color: 'White', fontFamily: 'Noto Sans', fontWeight: '800', fontSize: '2.25rem', mt: '20vh', mb: '4rem' }}>
                    LeafGPT
                </Typography>
                <div id='presentation'>
                    <Stack direction='row' display='flex' textAlign='center' spacing={2} width='720px'>
                        <div id='examples'>
                            <SunIcon sx={{ color: 'white' }} />
                            <Typography variant='h6' sx={{ textAlign: 'center', color: 'White', fontFamily: 'Noto Sans', fontSize: '1rem', mt: '0.5rem' }}>
                                Examples
                            </Typography>
                            <Button handleClick={handlePresentationButtonClick} clickable content='"Explain photosynthesis in simple terms"' />
                            <Button handleClick={handlePresentationButtonClick} clickable content='"Can you recommend some good science fiction books to read?"' />
                            <Button handleClick={handlePresentationButtonClick} clickable content='"Why is typescript better than javascript?"' />
                        </div>
                        <div id='capabilities'>
                            <BoltIcon sx={{ color: 'white' }} />
                            <Typography variant='h6' sx={{ textAlign: 'center', color: 'White', fontFamily: 'Noto Sans', fontSize: '1rem', mt: '0.5rem' }}>
                                Capabilities
                            </Typography>
                            <Button handleClick={handlePresentationButtonClick} content='Remembers what user said earlier in the conversation' />
                            <Button handleClick={handlePresentationButtonClick} content='Allows user to provide follow-up corrections' />
                            <Button handleClick={handlePresentationButtonClick} content='Trained to decline inappropriate requests 😑' />
                        </div>
                        <div id='limitations'>
                            <WarningIcon sx={{ color: 'white' }} />
                            <Typography variant='h6' sx={{ textAlign: 'center', color: 'White', fontFamily: 'Noto Sans', fontSize: '1rem', mt: '0.5rem' }}>
                                Limitations
                            </Typography>
                            <Button handleClick={handlePresentationButtonClick} content='May occasionally generate incorrect information ⚠️' />
                            <Button handleClick={handlePresentationButtonClick} content='May occasionally produce harmful 💥 instructions or biased content ' />
                            <Button handleClick={handlePresentationButtonClick} content='Limited knowledge of world and events after 2021' />
                        </div>
                    </Stack>
                </div>
            </Stack>
        </div>
    );
};

export default Center;
