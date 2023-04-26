import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Router from 'next/router';
import { deepOrange } from '@mui/material/colors';
import AccountMenu from '../../includes/accountmenu';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

var about = '';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Home() {
    const theme = useTheme();

    const router = useRouter()
    const { id, page } = router.query

    let baseindex = 0;

    const [value, setValue] = React.useState(baseindex);

    useEffect(() => {
        let baseindex = 0;
    
        if (page === "home") {
          baseindex = 0;
        } else if (page === "about") {
          baseindex = 3;
        } else if (page === "videos") {
          baseindex = 1;
        } else if (page === "playlists") {
          baseindex = 2;
        } else if (page === "likes") {
          baseindex = 4;
        }
    
        setValue(baseindex);
      }, [page]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
          setPost(response.data);
        });
      }, []);

    axios.get('http://localhost:3001/api/users/')
        .catch(function (error) {
            console.log(error);
        })
        .then(function (response) {
            console.log(response.data);
            about = response.data[0].about;
        })

    return (
        <div className={roboto.className}>
            <AccountMenu></AccountMenu>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", marginBottom: "25px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "25%" }}>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 128, height: 128, marginRight: "5%" }} alt="Remy Sharp" src="/broken-image.jpg" >R</Avatar>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-evenly", height: "100%" }}>
                        <p style={{}}>Remy Sharp</p>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", color: "#606060", fontSize: "small" }}>
                            <p style={{ marginRight: 8, fontWeight: "800" }}>{id}</p>
                            <p style={{ marginRight: 8 }}>0 vidéo</p>
                            <p style={{ marginRight: 8 }}>0 abonné</p>
                        </div>
                        <Link href={"/channel/" + id + '/about'} >Découvrir tout ces petits secrets </Link>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", width: "25%", justifyContent: "space-evenly" }}>
                    <Fab color="primary" aria-label="Personalize" variant="extended" size='medium' onClick={() => Router.push(`/studio/${id}`)}>
                        Personalize
                    </Fab>
                </div>
            </div>
            <Box>
                <AppBar position="static" style={{ backgroundColor: "#000" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Home" {...a11yProps(0)} onClick={() => Router.push('/channel/' + id + '/home')} />
                        <Tab label="Videos" {...a11yProps(1)} onClick={() => Router.push('/channel/' + id + '/videos')} />
                        <Tab label="Playlists" {...a11yProps(2)} onClick={() => Router.push('/channel/' + id + '/playlists')} />
                        <Tab label="About" {...about} {...a11yProps(3)} onClick={() => Router.push('/channel/' + id + '/about')} />
                        <Tab icon={<FavoriteIcon />} label="" {...a11yProps(4)} onClick={() => Router.push('/channel/' + id + '/likes')} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        About
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        Empty
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </div>
    )

}
