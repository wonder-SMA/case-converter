import React from 'react';
import styles from './checkbox.module.css';

function Checkbox(props) {
    return (
        <input type="checkbox"
               name={props.name}
               id={props.id}
               className={styles.checkbox}
               onChange={props.onChange}
               checked={props.checked}
        >
        </input>
    )
}

export {Checkbox}