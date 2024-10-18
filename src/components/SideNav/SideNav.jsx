import React, { useState } from "react";
import styles from './SideNav.module.css';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

const SideNavbar = ({ setQuestion, setAnswer, setChatHistory }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };
    
    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const navigateToNewChat = () => {
        navigate('/');
        setQuestion('');
        setAnswer('');
        setChatHistory([]);
    }

    const navigateToPastConversations = () => {
        navigate('/past-conversations');
        setQuestion('');
        setAnswer('');
        setChatHistory([]);
    }

    const drawer = (
        <div>
            <Toolbar 
                style={{ 
                    background: 'var(--pale-violet)', 
                    fontSize: '20px', 
                    fontWeight: '400', 
                    gap: '1rem', 
                    cursor: 'pointer', 
                    padding: 0, 
                    display: 'flex', 
                    justifyContent: 'space-evenly' 
                }}
                onClick={navigateToNewChat}
            >
                <img src={require('../../Assets/domain-picture.png')} alt="ChatBot" />
                New Chat
                <img src={require('../../Assets/editIcon.png')} alt="Edit Option" />
            </Toolbar>
            <List>
                <ListItem disablePadding>
                <ListItemButton>
                    <Button onClick={navigateToPastConversations} style={{ borderRadius: '10px', color: 'var(--charcoal-gray)', fontSize: '16px', fontWeight: '700' }}>
                        Past Conversations
                    </Button>
                </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
    
    return (
        <>
            <AppBar
                sx={{
                    backgroundColor: 'var(--primary-background-color)',
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    boxShadow: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <Toolbar className={styles.botName}>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        size="4px"
                        sx={{ color: 'var(--muted-lavender)', display: { xs: 'block', md: 'none' } }}
                    >
                        <Menu sx={{ display: 'flex', alignItems: 'flex-end', fontSize: '32px', fontWeight: 'bold' }} />
                    </IconButton>
                    <Typography color="var(--muted-lavender)" fontFamily='var(--primary-font-family)' fontSize='28px' fontWeight='700' variant="h5" component="div">
                        Bot AI
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default SideNavbar;