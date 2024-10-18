import React, { useEffect, useState } from "react";
import styles from './ChatSection.module.css';
import aiResponse from '../../sample.json';
import ChatBotIcon from '../../Assets/chatbot-icon.svg';
import ChatCard from "../ChatCard/ChatCard";

const ChatSection = ({ question, answer, chatHistory, setChatHistory, sessionId, setSessionId }) => {
    const [displayData, setDisplayData] = useState([]);
    
    const getCurrentTime = () => {
        const today = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return today.toLocaleTimeString([], options);
    };

    const timeNow = getCurrentTime();

    useEffect(() => {
        if (chatHistory.length === 0) {
            const initialSessionId = `session-${new Date().getDate()}-${new Date().getTime()}`;
            setSessionId(initialSessionId);
        }
    }, [chatHistory, setSessionId]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setDisplayData(aiResponse.slice(0, 3));
            } else {
                setDisplayData(aiResponse.slice(0, 4));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (question && !chatHistory.some(chat => chat.question === question)) {
            const newChat = { question, answer, time: timeNow };
            setChatHistory(prev => [...prev, newChat]);
        }
    }, [question, answer, chatHistory, setChatHistory, timeNow]);

    const handleCardClick = (item) => {
        setSessionId(`session-${new Date().getDate()}-${new Date().getTime()}`);
        const newChat = { question: item.question, answer: item.response, time: timeNow }; // Ensure time is stored properly
        setChatHistory(prev => [...prev, newChat]);
    };

    return (
        <>
            {chatHistory.length > 0 || question ? (
                <div className={styles.chatView}>
                    {chatHistory.map((chat, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Render question card */}
                            <ChatCard
                                cardData={chat.question}
                                currentTime={chat.time}
                                type='question'
                                sessionId={sessionId}
                                chatIndex={index}
                                chatHistory={chatHistory}
                                setChatHistory={setChatHistory}
                            />
                            {/* Render response card */}
                            {chat.answer && (
                                <ChatCard
                                    cardData={chat.answer}
                                    currentTime={chat.time}
                                    type='response'
                                    sessionId={sessionId}
                                    chatIndex={index}
                                    chatHistory={chatHistory}
                                    setChatHistory={setChatHistory}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.defaultView}>
                    <div className={styles.chatbotGeeting}>
                        <h2 style={{ fontSize: 'clamp(24px, 2vw, 28px)' }}>How Can I Help You Today?</h2>
                        <img src={ChatBotIcon} alt="Chat Bot" />
                    </div>
                    <div className={styles.defaultContainer}>
                        {displayData.map((item, index) => (
                            <div className={styles.defaultCards} key={index} onClick={() => handleCardClick(item)}>
                                <h3>{item.question}</h3>
                                <p>Get immediate AI generated response</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatSection;
