import React from "react";
import styles from './Home.module.css';
import { Box } from "@mui/material";
import SideNavbar from "../components/SideNav/SideNav";
import ChatSection from "../components/ChatSection/ChatSection";
import SearchBox from "../components/SearchBar/SearchBar";
import { useAppContext } from '../Context';

const Home = () => {
    const {
        question, setQuestion,
        answer, setAnswer,
        chatHistory, setChatHistory,
        sessionId, setSessionId,
        setSessionIdList
    } = useAppContext();


    return (
        <Box sx={{ display: 'flex' }}>
            <SideNavbar setQuestion={setQuestion} setAnswer={setAnswer} setChatHistory={setChatHistory} />
            <Box className={styles.chatContainer} component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 240px)` } }}>
                <ChatSection question={question} answer={answer} chatHistory={chatHistory} setChatHistory={setChatHistory} sessionId={sessionId} setSessionId={setSessionId} />
                <SearchBox setQuestion={setQuestion} setAnswer={setAnswer} chatHistory={chatHistory} sessionId={sessionId} setSessionIdList={setSessionIdList} />  
            </Box>  
        </Box>
    )
}

export default Home;