import React from 'react';
import styles from './button.module.css';

function Button(props) {
    return (
        <button
            type={props.type}
            className={styles.button}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </button>
    )
}

export {Button}