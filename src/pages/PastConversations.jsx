import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import { Box } from "@mui/material";
import SideNavbar from "../components/SideNav/SideNav";
import { useAppContext } from "../Context";
import OldConversations from "../components/ChatListPage/ChatListPage";

const ConversationHistoryPage = () => {
    const {
        setQuestion,
        setAnswer,
        setChatHistory,
        sessionIdList, setSessionIdList
    } = useAppContext();

    const [selectedRating, setSelectedRating] = useState('');

    const handleSelectChange = (event) => {
        setSelectedRating(event.target.value);
    }

    const loadSessionIds = () => {
        const allKeys = Object.keys(localStorage);
        const sessionKeys = [];

        allKeys.forEach((key) => {
            sessionKeys.push(key);
        });

        setSessionIdList(sessionKeys);
    };

    useEffect(() => {
        loadSessionIds();

        const handleStorageChange = () => {
            loadSessionIds();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const filteredSessionList = sessionIdList.filter((sessionKey) => {
        const sessionData = JSON.parse(localStorage.getItem(sessionKey));
        return sessionData && sessionData.some(item => item.rating === Number(selectedRating));
    });

    return (
        <Box sx={{ display: 'flex' }}>
            <SideNavbar setQuestion={setQuestion} setAnswer={setAnswer} setChatHistory={setChatHistory} />
            <Box className={styles.chatContainer} component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 240px)` } }}>
                <div className={styles.conversationFilter}>
                    <h3 style={{ fontSize: '28px', fontWeight: '400' }}>Conversation History</h3>
                    <select onChange={handleSelectChange} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}>
                        <option value="">All Ratings</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Star</option>
                        <option value="3">3 Star</option>
                        <option value="4">4 Star</option>
                        <option value="5">5 Star</option>
                    </select>
                </div>
                
                {selectedRating && filteredSessionList.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No content to display for {selectedRating} Star rating.</p>
                ) : (
                    <OldConversations sessionList={selectedRating ? filteredSessionList : sessionIdList} />
                )}
            </Box>
        </Box>
    );
}

export default ConversationHistoryPage;
