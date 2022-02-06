import React from 'react';
import styles from './input.module.css';

function Input(props) {
    return (
        <input type={props.type}
               value={props.value}
               placeholder={props.placeholder}
               className={styles.input}
               onChange={props.onChange}
        >
        </input>
    )
}

export {Input}