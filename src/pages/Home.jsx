import React, { useState } from "react";
import styles from './Home.module.css';
import { Box } from "@mui/material";
import SideNavbar from "../components/SideNav/SideNav";
import ChatSection from "../components/ChatSection/ChatSection";
import SearchBox from "../components/SearchBar/SearchBar";

const Home = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [sessionId, setSessionId] = useState(chatHistory.length > 0 ? chatHistory.sessionId : '');


    return (
        <Box sx={{ display: 'flex' }}>
            <SideNavbar setQuestion={setQuestion} setAnswer={setAnswer} setChatHistory={setChatHistory} />
            <Box className={styles.chatContainer} component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 240px)` } }}>
                <ChatSection question={question} answer={answer} chatHistory={chatHistory} setChatHistory={setChatHistory} sessionId={sessionId} setSessionId={setSessionId} />
                <SearchBox setQuestion={setQuestion} setAnswer={setAnswer} chatHistory={chatHistory} sessionId={sessionId} />  
            </Box>  
        </Box>
    )
}

export default Home;