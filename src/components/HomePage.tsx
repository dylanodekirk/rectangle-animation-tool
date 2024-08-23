import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Shape from './Shape';
import { BounceTypes, Color, bounceDefinitions, colorDefinitions } from '../utils/util';
import './homePage.css';
import { Divider, FormControl, FormHelperText, InputAdornment, OutlinedInput, Button, Card, CardContent, CardHeader } from '@mui/material';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AnimationOutlinedIcon from '@mui/icons-material/AnimationOutlined';
import PhotoSizeSelectLargeOutlinedIcon from '@mui/icons-material/PhotoSizeSelectLargeOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import funGraphic from '../funGraphic.jpg'
import Draggable from 'react-draggable';

const drawerWidth = 340;

interface BounceState {
    color: Color;
    width: number;
    height: number;
    bounceType: BounceTypes;
    speed: number | string;
    bounceHeight: number | string;
}

export default function ResponsiveDrawer() {
    const [currentColor, setCurrentColor] = useState<Color>('neutral');
    const [width, setWidth] = useState<number>(100);
    const [height, setHeight] = useState<number>(100);
    const [bounceTypeState, setBounceType] = useState<BounceTypes>('none');
    const [animationSpeed, setAnimationSpeed] = useState<number | string>(1);
    const [bounceHeight, setBounceHeight] = useState<number | string>(50);
    const [bounceStates, setBounceStates] = useState<BounceState[]>([]);
    const [playbackIndex, setPlaybackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setPlaybackIndex(prevIndex => {
                    if (prevIndex < bounceStates.length - 1) {
                        return prevIndex + 1;
                    } else {
                        setIsPlaying(false);
                        return 0;
                    }
                });
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isPlaying, bounceStates.length]);

    const handleColorChange = (color: Color) => {
        setCurrentColor(color);
    };

    const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setWidth(Number(value) || 0);
        }
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setHeight(Number(value) || 0);
        }
    };

    const handleAnimationType = (bounceType: BounceTypes) => {
        setBounceType(bounceType);
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setAnimationSpeed('');
        } else {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && numericValue >= 0.5 && numericValue <= 5) {
                setAnimationSpeed(numericValue);
            }
        }
    };

    const handleBounceHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setBounceHeight(Number(value) || 0);
        }
    };

    const addBounceState = () => {
        setBounceStates([
            ...bounceStates,
            {
                color: currentColor,
                width,
                height,
                bounceType: bounceTypeState,
                speed: animationSpeed,
                bounceHeight,
            },
        ]);
    };

    const removeBounceState = (index: number) => {
        setBounceStates(bounceStates.filter((_, i) => i !== index));
        if (playbackIndex === index) {
            setPlaybackIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
        }
    };

    const startPlayback = () => {
        setIsPlaying(true);
    };

    const stopPlayback = () => {
        setIsPlaying(false);
    };

    const drawer = (
        <div style={{ height: '100%', backgroundColor: '#fafaf9' }}>
            <Typography align='left' className='pl-5 py-2' variant='h5'> Options </Typography>
            <Divider />
            <div className='flex items-center pl-4 pt-8'>
                <ColorLensOutlinedIcon />
                <Typography className='pl-2' variant='body1'> Colors </Typography>
            </div>
            <div className='grid grid-cols-3 gap-4 pt-4 px-4'>
                {Object.keys(colorDefinitions).map((color) => (
                    <button
                        key={color}
                        onClick={() => handleColorChange(color as Color)}
                        style={{ backgroundColor: colorDefinitions[color as Color] }}
                        className={`circle-button ${color === 'neutral' ? 'text-slate-600' : 'text-slate-100'}`}
                    >
                    </button>
                ))}
                <button className='hex-circle bg-gradient-to-tr from-red-500 via-green-500 to-purple-500'>
                    <div className='inner-circle'>
                        <AddCircleOutlineIcon />
                    </div>
                </button>
            </div>
            <div className='flex items-center pl-4 pt-8'>
                <AnimationOutlinedIcon />
                <Typography className='pl-2' variant='body1'> Animation </Typography>
            </div>
            <div className='grid grid-cols-2 gap-4 pt-4 px-4'>
                {Object.keys(bounceDefinitions).map((bounceType) => (
                    <button className='py-4 bg-violet-200 hover:bg-violet-300 rounded-md' key={bounceType} onClick={() => handleAnimationType(bounceType as BounceTypes)}>
                        {bounceType.charAt(0).toUpperCase() + bounceType.slice(1)}
                    </button>
                ))}
            </div>
            <div className='flex items-center pl-4 pt-8 pt-2'>
                <SpeedIcon />
                <Typography className='pl-2' variant='body1'> Speed </Typography>
            </div>
            <div className='flex pl-4 pt-4'>
                <FormControl sx={{ width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        value={animationSpeed}
                        onChange={handleSpeedChange}
                        id="animation-speed"
                        endAdornment={<InputAdornment position="end">s</InputAdornment>}
                        aria-describedby="animation-speed-helper-text"
                        inputProps={{
                            'aria-label': 'animation speed',
                            type: 'number',
                            step: 0.1,
                            min: 0.5,
                            max: 5,
                            pattern: "[0-9]*[.]?[0-9]+"
                        }}
                    />
                </FormControl>
            </div>

            <div className='flex items-center pl-4 pt-8 pt-2'>
                <PhotoSizeSelectLargeOutlinedIcon />
                <Typography className='pl-2' variant='body1'> Dimensions </Typography>
            </div>
            <div className='grid grid-cols-2 pl-4 pt-4'>
                <FormControl sx={{ width: '12ch' }} variant="outlined">
                    <OutlinedInput
                        value={width}
                        onChange={handleWidthChange}
                        id="outlined-width"
                        endAdornment={<InputAdornment position="end">px</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'width',
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Width</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: '12ch' }} variant="outlined">
                    <OutlinedInput
                        value={height}
                        onChange={handleHeightChange}
                        id="outlined-height"
                        endAdornment={<InputAdornment position="end">px</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'height',
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Height</FormHelperText>
                </FormControl>
            </div>

            <div className='flex items-center pl-4 pt-8 pt-2'>
                <SpeedIcon />
                <Typography className='pl-2' variant='body1'> Bounce Height </Typography>
            </div>
            <div className='flex pl-4 pt-4'>
                <FormControl sx={{ width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        value={bounceHeight}
                        onChange={handleBounceHeightChange}
                        id="bounce-height"
                        endAdornment={<InputAdornment position="end">px</InputAdornment>}
                        aria-describedby="bounce-height-helper-text"
                        inputProps={{
                            'aria-label': 'bounce height',
                            type: 'number',
                            step: 1,
                            min: 0,
                        }}
                    />
                </FormControl>
            </div>
        </div>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: '#1e1b4b', height: 'auto' }}>
                <Toolbar />
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        height: '100%',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {drawer}
            </Drawer>
            <Box
                component="main"
                sx={{
                    bgcolor: 'background.default',
                    p: 3,
                    height: 'calc(100% - 100px)',
                    marginLeft: `${drawerWidth}px`,
                }}
            >
                <Toolbar />
                <Shape
                    currentColor={currentColor}
                    width={width}
                    height={height}
                    bounceType={bounceTypeState}
                    speed={animationSpeed}
                    bounceHeight={bounceHeight}
                />
                <Divider />
                <Typography variant='h6'> Animation Canvas </Typography>

                <div className='flex flex-row items-center justify-center'>
                    <img src={funGraphic} />
                    <div className='pl-10'>
                        <Shape
                            currentColor={bounceStates[playbackIndex]?.color || currentColor}
                            width={bounceStates[playbackIndex]?.width || width}
                            height={bounceStates[playbackIndex]?.height || height}
                            bounceType={bounceStates[playbackIndex]?.bounceType || bounceTypeState}
                            speed={bounceStates[playbackIndex]?.speed || animationSpeed}
                            bounceHeight={bounceStates[playbackIndex]?.bounceHeight || bounceHeight}
                        />
                    </div>
                </div>

            </Box>
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: drawerWidth,
                    height: '150px',
                    backgroundColor: '#f5f5f5',
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    paddingLeft: '20px'
                }}
            >
                <div
                    style={{
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        justifyContent: 'left',
                        gap: '8px',
                        paddingTop: '20px'
                    }}
                >
                    <Button variant='outlined' onClick={addBounceState}>Add Bounce State</Button>
                    <Button variant='outlined' onClick={startPlayback} disabled={isPlaying}>Start</Button>
                    <Button variant='outlined' onClick={stopPlayback} disabled={!isPlaying}>Stop</Button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'auto',
                        width: '100%',
                        gap: '8px',
                        paddingTop: '20px'
                    }}
                >
                    {bounceStates.map((state, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                border: '.75px solid ',
                                alignItems: 'center',
                                minHeight: 48,
                                borderRadius: '10px',
                                backgroundColor: colorDefinitions[state.color]
                            }}
                        >
                            <Typography className='pl-4 text-white' variant='body2'>{`Frame ${index + 1}`}</Typography>
                            <Button sx={{ color: 'white' }} onClick={() => removeBounceState(index)}>x</Button>
                        </div>
                    ))}
                </div>
            </div>
        </Box >
    );
}
