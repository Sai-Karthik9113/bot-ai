import React, { useState } from "react";
import styles from './SearchBar.module.css';
import Button from "../Button/Button";
import aiResponse from '../../sample.json';

const SearchBox = ({ setQuestion, setAnswer, chatHistory, sessionId, setSessionIdList }) => {
    const [inputBox, setInputBox] = useState('');

    const handleInputChange = (event) => {
        setInputBox(event.target.value);
    };

    const handleAskClick = () => {
        if (inputBox) {
            const questionRaised = aiResponse.find(item => item.question.replace(/\?$/, '').trim().toLowerCase() === inputBox.replace(/\?$/, '').trim().toLowerCase());
            setQuestion(inputBox);
            setAnswer(questionRaised ? questionRaised.response : `As an AI Language Model, I don't have the details`);
            setInputBox('');
        }
    };

    const handleSaveClick = () => {

        localStorage.setItem(`${sessionId}`, JSON.stringify(chatHistory));

        alert('Chat history saved successfully!');
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                onChange={handleInputChange}
                value={inputBox}
                className={styles.inputContainer}
            />
            <Button
                onClick={handleAskClick}
                style={{ width: 'fit-content', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: '400' }}>
                Ask
            </Button>
            <Button
                onClick={handleSaveClick}
                style={{ width: 'fit-content', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: '400' }}>
                Save
            </Button>
        </div>
    );
};

export default SearchBox;
