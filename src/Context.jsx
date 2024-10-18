import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [sessionId, setSessionId] = useState('');
    const [sessionIdList, setSessionIdList] = useState([]);

    return (
        <AppContext.Provider value={{
            question, setQuestion,
            answer, setAnswer,
            chatHistory, setChatHistory,
            sessionId, setSessionId,
            sessionIdList, setSessionIdList
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);