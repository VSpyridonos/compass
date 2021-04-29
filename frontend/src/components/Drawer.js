import { React, useState, useReducer } from 'react';
import NewMap from './NewMap'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ExploreIcon from '@material-ui/icons/Explore';
import Checkbox from '@material-ui/core/Checkbox';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'


const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapStyles = {
    width: '100%',
    height: '100%',
};


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer({ window, data }) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState('');
    const [markers, setMarkers] = useState([]);
    const [originalMarkers, setOriginalMarkers] = useState([]);
    const [olderTours, setOlderTours] = useState(false);
    const [olderMarkers, setOlderMarkers] = useState([]);
    const [allMarkers, setAllMarkers] = useState([]);
    const [allOriginalMarkers, setAllOriginalMarkers] = useState([]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getUserInfo = (user) => {
        setCurrentUser(user);
    }

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            user: ""
        }
    );




    const handleSubmit = async (e) => {
        e.preventDefault();

        let { user } = formInput;


        let allUserMarkers = [];
        let allUserOriginalMarkers = [];
        if (user === 'All Users') {
            let resultsAll = await axios.get(`http://${process.env.REACT_APP_DIGITAL_OCEAN_DROPLET_IP_ADDRESS}:5000/users/all-users`);
            setCurrentUser('All Users');
            for (let user of resultsAll.data) {
                let userMarkers = await user.measurements.map(measurement =>
                    <Marker
                        key={measurement._id}
                        position={{ lat: parseFloat(measurement.xHatNew[0]), lng: parseFloat(measurement.xHatNew[1]) }}
                        defaultTitle={`${String(user.username)}'s position on:\n${measurement.date.slice(0, 10)}, ${measurement.date.slice(11, 19)}\n\nlat: ${parseFloat(measurement.xHatNew[0])}\nlng: ${parseFloat(measurement.xHatNew[1])}`}
                    />
                );
                allUserMarkers.push(userMarkers);

                let userOriginalMarkers = await user.measurements.map(measurement =>
                    <Marker
                        key={measurement._id}
                        position={{ lat: parseFloat(measurement.xHatOriginal[0]), lng: parseFloat(measurement.xHatOriginal[1]) }}
                        defaultTitle={`Original Data:\n${String(user.username)}'s position on:\n${measurement.date.slice(0, 10)}, ${measurement.date.slice(11, 19)}\n\nlat: ${parseFloat(measurement.xHatOriginal[0])}\nlng: ${parseFloat(measurement.xHatOriginal[1])}`}
                    />
                );
                allUserOriginalMarkers.push(userOriginalMarkers);

            }

        }
        setAllMarkers(allUserMarkers);
        setAllOriginalMarkers(allUserOriginalMarkers);



        const results = await axios.get(`http://${process.env.REACT_APP_DIGITAL_OCEAN_DROPLET_IP_ADDRESS}:5000/users/${user}`);
        setCurrentUser(results.data);
        let userMarkers = await results.data.measurements.map(measurement =>
            <Marker
                key={measurement._id}
                position={{ lat: parseFloat(measurement.xHatNew[0]), lng: parseFloat(measurement.xHatNew[1]) }}
                defaultTitle={`${String(results.data.username)}'s position on:\n${measurement.date.slice(0, 10)}, ${measurement.date.slice(11, 19)}\n\nlat: ${parseFloat(measurement.xHatNew[0])}\nlng: ${parseFloat(measurement.xHatNew[1])}`}
            />
        );


        setMarkers(userMarkers);

        let userOriginalMarkers = await results.data.measurements.map(measurement =>
            <Marker
                key={measurement._id}
                position={{ lat: parseFloat(measurement.xHatOriginal[0]), lng: parseFloat(measurement.xHatOriginal[1]) }}
                defaultTitle={`Original Data:\n${String(results.data.username)}'s position on:\n${measurement.date.slice(0, 10)}, ${measurement.date.slice(11, 19)}\n\nlat: ${parseFloat(measurement.xHatOriginal[0])}\nlng: ${parseFloat(measurement.xHatOriginal[1])}`}
            />
        );

        setOriginalMarkers(userOriginalMarkers);

        if (!olderTours) return;

        let allOlderMarkers = []
        if (results.data.olderMeasurements.length) {
            for (let measurements of results.data.olderMeasurements) {
                let userOlderMarkers = await measurements.map(measurement =>
                    <Marker
                        key={measurement._id}
                        position={{ lat: parseFloat(measurement.xHatNew[0]), lng: parseFloat(measurement.xHatNew[1]) }}
                        defaultTitle={`Older measurement:\n${String(results.data.username)}'s position on:\n${measurement.date.slice(0, 10)}, ${measurement.date.slice(11, 19)}\n\nlat: ${parseFloat(measurement.xHatOriginal[0])}\nlng: ${parseFloat(measurement.xHatOriginal[1])}`}
                    />
                );
                allOlderMarkers.push(userOlderMarkers)
            }

        }
        setOlderMarkers(allOlderMarkers);

    };

    const handleInput = e => {
        const user = e.target.name;
        const newValue = e.target.value;
        setFormInput({ [user]: newValue });
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <br />
            <br />

            <form onSubmit={handleSubmit} style={{ 'marginLeft': '15px' }}>

                <FormControl className={classes.formControl}>
                    <InputLabel id="user-select-label">Select a user</InputLabel>
                    <Select
                        name="user"
                        labelId="user-select-label"
                        id="user-select"
                        native
                        value={formInput.user ? formInput.user : ''}
                        onChange={handleInput}
                    >
                        <option aria-label="None" value="" />
                        <option value="All Users" style={{ 'fontWeight': 'bold' }}>All Users</option>
                        {data.map((user) => (
                            <option key={user._id} value={user._id}>{user.username}</option>
                        ))}

                    </Select>
                </FormControl>

                <br />
                <br />
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="end"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={olderTours}
                                    value={olderTours}
                                    onChange={(e) => setOlderTours(e.currentTarget.checked)}
                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                    labelplacement="end"
                                />
                            }
                            label="Also display older tours"
                            labelPlacement="end"
                        />
                    </FormGroup>
                </FormControl>
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">
                    DISPLAY
                    </Button>


            </form>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <span style={{ fontSize: '36px' }}>C<ExploreIcon className="material-icons" style={{ fontSize: '28px' }} />mpass</span>
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <NewMap
                    users={currentUser ? currentUser : data}
                    markers={markers}
                    originalMarkers={originalMarkers}
                    olderTours={olderTours}
                    olderMarkers={olderMarkers}
                    allMarkers={allMarkers}
                    allOriginalMarkers={allOriginalMarkers}

                />

                <br />
                <br />

                <Typography paragraph>
                    Currently showing tour info for user: {currentUser.username ?? currentUser}
                </Typography>

            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
