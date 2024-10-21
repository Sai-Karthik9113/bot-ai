import React from "react";
import styles from './ChatListPage.module.css';
import { ReactComponent as UserIcon } from '../../Assets/user-icon.svg';
import { ReactComponent as ChatbotIcon } from '../../Assets/chatbot-icon.svg';
import Rating from '@mui/material/Rating';  // Import the Rating component from MUI

const OldConversations = ({ sessionList }) => {
    
    // Function to format and compare dates
    const formatDateLabel = (day) => {
        const today = new Date();
        const sessionDate = new Date();
        sessionDate.setDate(today.getDate() - (today.getDate() - parseInt(day))); // Use the day part from sessionKey

        const todayDateString = today.toDateString();
        const yesterdayDateString = new Date(today.setDate(today.getDate() - 1)).toDateString();

        if (sessionDate.toDateString() === todayDateString) return "Today's Chats";
        if (sessionDate.toDateString() === yesterdayDateString) return "Yesterday's Chats";
        return `${sessionDate.getDate()} ${sessionDate.toLocaleString('default', { month: 'long' })}, ${sessionDate.getFullYear()} Chats`;
    };

    // Function to group and sort sessions by date
    const groupSessionsByDate = (sessions) => {
        const groupedSessions = sessions.reduce((grouped, sessionKey) => {
            const parts = sessionKey.split('-');
            const day = parts[1]; // Extract the day part from sessionKey
            
            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(sessionKey);
            return grouped;
        }, {});

        // Sort the grouped sessions by the day in descending order (most recent first)
        const sortedDays = Object.keys(groupedSessions).sort((a, b) => b - a);
        return sortedDays.map(day => ({ day, sessions: groupedSessions[day] }));
    };

    // Group and sort the sessions
    const groupedSessions = groupSessionsByDate(sessionList);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '20px' }}>
            {groupedSessions.map(({ day, sessions }) => (
                <div key={day}>
                    {/* Display the formatted day */}
                    <h2 style={{ fontFamily: 'var(--primary-font-family)', fontSize: '20px' }}>
                        {formatDateLabel(day)}
                    </h2>
                    
                    {/* Iterate over each session key for the day */}
                    {sessions.map((sessionKey) => {
                        const sessionData = JSON.parse(localStorage.getItem(sessionKey));

                        return (
                            <div key={sessionKey} style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '3rem',
                                border: '1px solid #ccc', 
                                borderRadius: '10px', 
                                padding: '20px', 
                                width: '100%',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                background: 'var(--conversation-historyCard-bg)'
                            }}>
                                {sessionData && sessionData.length > 0 ? (
                                    sessionData.map((item, index) => (
                                        <div className={styles.sessionContainer} key={index}>
                                            {/* Question Card */}
                                            <div className={styles.userCard}>
                                                <div className={styles.profileIcon}>
                                                    <UserIcon style={{ width: 'clamp(36px, 10vw, 66px)', height: 'auto' }} />
                                                </div>
                                                <div className={styles.detailsContainer}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                        <h4 style={{ fontFamily: 'var(--primary-font-family)', fontSize: '16px', fontWeight: '700' }}>You</h4>
                                                        <p style={{ fontFamily: 'var(--secondary-font-family)', fontSize: '16px' }}>{item.question}</p>
                                                    </div>
                                                    <p style={{ color: 'rgba(0, 0, 0, 0.62)', fontFamily: 'var(--secondary-font-family)', fontSize: '12px' }}>
                                                        {item.time}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Answer Card */}
                                            <div className={styles.botCard}>
                                                <div className={styles.profileIcon}>
                                                    <ChatbotIcon style={{ width: 'clamp(36px, 10vw, 66px)', height: 'clamp(39px, 100%, 69px)' }} />
                                                </div>
                                                <div className={styles.detailsContainer}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                        <h4 style={{ fontFamily: 'var(--primary-font-family)', fontSize: '16px', fontWeight: '700' }}>Soul AI</h4>
                                                        <p style={{ fontFamily: 'var(--secondary-font-family)', fontSize: '16px' }}>{item.answer}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
                                                        <p style={{ color: 'rgba(0, 0, 0, 0.62)', fontFamily: 'var(--secondary-font-family)', fontSize: '12px' }}>
                                                            {item.time}
                                                        </p>

                                                        {/* Render starRating if available */}
                                                        {item.rating && (
                                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                                <Rating 
                                                                    name={`rating-${index}`} 
                                                                    value={item.rating} 
                                                                    readOnly 
                                                                    size="small"
                                                                    style={{ color: '#000000' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {item.feedback && (
                                                        <p style={{ fontFamily: 'var(--secondary-font-family)', fontSize: '14px' }}>
                                                            <strong>Feedback:</strong> {item.feedback}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No conversation data available.</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default OldConversations;
