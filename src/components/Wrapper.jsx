import React from 'react'
import styles from '../styles/wrapper.module.css';
const Wrapper = ({children}) => {
  return (
    <div className={styles.wrapper}>
        {children}
    </div>
  )
}

export default Wrapper