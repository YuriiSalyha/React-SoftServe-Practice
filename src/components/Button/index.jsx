import React from 'react'
import styles from './button.module.css';

const Button = ({ children, ...props }) => {
    return (
        <button className={`${styles.btn} ${styles.text}`} {...props}>
            {children}
        </button>
    )
}

export default Button