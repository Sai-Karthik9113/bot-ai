import React, { useState } from "react";
import styles from './ChatCard.module.css';
import Button from '../Button/Button';
import { Typography, Modal, Rating } from "@mui/material";
import { ReactComponent as UserIcon } from '../../Assets/user-icon.svg';
import { ReactComponent as ChatbotIcon } from '../../Assets/chatbot-icon.svg';
import { LuThumbsUp } from "react-icons/lu";
import { LuThumbsDown } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";

const ChatCard = ({ cardData, currentTime, type, chatIndex, chatHistory, setChatHistory }) => {
    const [hovered, setHovered] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [ratingVisible, setRatingVisible] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [feedbackData, setFeedbackData] = useState('');
    const [feedbackProvided, setFeedbackProvided] = useState('');
    const [selectedThumb, setSelectedThumb] = useState(null); // State for tracking selected thumb

    const handleThumbsUpClick = () => {
        setSelectedThumb('up');
        setRatingVisible(true);
        setFeedbackModalOpen(false);
    }

    const handleThumbsDownClick = () => {
        if (feedbackData !== '') {
            setSelectedThumb('down');
        }
        setRatingVisible(true);
        setFeedbackModalOpen(true);
    }

    const handleFeedbackClose = () => {
        setFeedbackModalOpen(false);
        // Reset only if feedback was not submitted
        if (feedbackData === '' && userRating === 0) {
            setSelectedThumb(null);
            setRatingVisible(false);
        }
    }

    const handleRatingChange = (event, newRating) => {
        setUserRating(newRating);
    
        const updatedChatHistory = [...chatHistory];
        updatedChatHistory[chatIndex] = { ...updatedChatHistory[chatIndex], rating: newRating };
    
        setChatHistory(updatedChatHistory);
    };

    const handleFeedback = (event) => {
        setFeedbackData(event.target.value);
    }

    const handleFeedbackSubmit = () => {
        const updatedChatHistory = [...chatHistory];
        updatedChatHistory[chatIndex] = { ...updatedChatHistory[chatIndex], feedback: feedbackData };
        setFeedbackProvided(feedbackData);
        setChatHistory(updatedChatHistory);
        setSelectedThumb('down');
        handleFeedbackClose();
        setFeedbackData('');
    };
    
    switch (type) {
        case 'question':
            return (
                <div className={styles.userCard}>
                    <div className={styles.profileIcon}>
                        <UserIcon style={{ width: 'clamp(36px, 10vw, 66px)', height: 'auto' }} />
                    </div>
                    <div className={styles.detailsContainer}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <Typography style={{ fontFamily: 'var(--primary-font-family)', fontSize: '16px', fontWeight: '700' }}>
                                You
                            </Typography>
                            <Typography style={{ fontFamily: 'var(--secondary-font-family)', fontSize: '16px' }}>
                                {cardData}
                            </Typography>
                        </div>
                        <Typography style={{ color: 'rgba(0, 0, 0, 0.62)', fontFamily: 'var(--secondary-font-family)', fontSize: '12px' }}>
                            {currentTime}
                        </Typography>
                    </div>
                </div>
            );
        case 'response':
            return (
                <div className={styles.userCard} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <div className={styles.profileIcon}>
                        <ChatbotIcon style={{ width: 'clamp(36px, 10vw, 66px)', height: 'clamp(39px, 100%, 69px)' }} />
                    </div>
                    <div className={styles.detailsContainer}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <Typography style={{ fontFamily: 'var(--primary-font-family)', fontSize: '16px', fontWeight: '700' }}>
                                Soul AI
                            </Typography>
                            <Typography style={{ fontFamily: 'var(--secondary-font-family)', fontSize: '16px' }}>
                                {cardData}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{ color: 'rgba(0, 0, 0, 0.62)', fontFamily: 'var(--secondary-font-family)', fontSize: '12px' }}>
                                {currentTime}
                            </Typography>
                            {
                                hovered && (
                                    <div className={styles.feedbackContainer}>
                                        <LuThumbsUp
                                            onClick={handleThumbsUpClick}
                                            style={{ cursor: 'pointer', color: selectedThumb === 'up' ? 'blue' : 'black' }} // Change color based on selection
                                        />
                                        <LuThumbsDown
                                            onClick={handleThumbsDownClick}
                                            style={{ cursor: 'pointer', color: selectedThumb === 'down' ? 'red' : 'black' }} // Change color based on selection
                                        />
                                    </div>
                                )
                            }
                        </div>
                        {ratingVisible && (
                            <Rating
                                name="user-rating"
                                value={userRating}
                                onChange={handleRatingChange}
                                size="small"
                            />
                        )}
                        {feedbackProvided && (
                            <div style={{ fontFamily: 'var(--secondary-font-family)' }}>
                                <strong>Feedback:</strong> {feedbackProvided}
                            </div>
                        )}
                    </div>
                    <Modal
                        open={feedbackModalOpen}
                        onClose={handleFeedbackClose}
                        aria-labelledby="feedback-modal-title"
                        aria-describedby="feedback-modal-description"
                        slotProps={{
                            backdrop: {
                                style: {
                                    backdropFilter: 'blur(4px)'
                                }
                            }
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div className={styles.modalContainer}>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 0' }}>
                                <TbBulb size={40} />
                                <h3 id="feedback-modal-title" style={{ fontFamily: 'var(--secondary-font-family)', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: '400', paddingLeft: '1rem'}}>
                                    Provide Additional Feedback
                                </h3>
                            </div>
                            <textarea
                                rows="10"
                                onChange={handleFeedback}
                                value={feedbackData} // Bind textarea to feedback state
                                style={{ width: '100%', marginBottom: '16px', resize: 'none', padding: '1rem', fontFamily: 'var(--secondary-font-family)', letterSpacing: '0.5px' }}
                            />
                            <Button onClick={handleFeedbackSubmit}>Submit</Button>
                        </div>
                    </Modal>
                </div>
            );
        default:
            return <></>;
    }
}

export default ChatCard;
