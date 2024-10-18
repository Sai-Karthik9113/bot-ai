import React from "react";
import styles from './Button.module.css';

const Button = ({ children, style, onClick }) => {
    return (
        <button onClick={onClick} className={styles.botAiButtons} style={style}>{children}</button>
    );
}

export default Button;