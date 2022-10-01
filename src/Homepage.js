import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

export default function Homepage(props) {

    const { navigate } = props


    const images = [
        {
            url: '/EnterNew.jpg',
            title: 'Log a New Blood Pressure',
            maxWidth: '50vw',
            width: '40vw',
            marginBottom: '20px',

        },
        {
            url: '/SeeResults.jpg',
            title: 'See My Results',
            maxWidth: '50vw',
            width: '40vw',

        },
    ];


    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 250,
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '70vw !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },

        },

    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    return (
        <>
            {/* <h1 style={{ textAlign: "center" }}>My Blood Pressure Tracker</h1> */}

            <Box className='box' sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', maxWidth: '100vw', width: '100%', mt: '80px', alignItems: 'center' }}>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        onClick={() => {
                            if (image.title === "Log a New Blood Pressure") {
                                navigate("/newreading")
                            }
                            else {
                                navigate("/results")
                            }
                        }
                        }
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,

                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </Box>

        </>
    )
}