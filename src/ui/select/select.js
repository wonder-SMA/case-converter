import React from 'react';
import styles from './select.module.css';
import {Checkbox} from "../checkbox";

function Select(props) {
    const [isCaseUse, setIsCaseUse] = React.useState(false);

    function handleUseCase() {
        setIsCaseUse(!isCaseUse)
    }

    return (
        <div className={styles['option']}>
            <Checkbox name={props.name}
                      id={props.id}
                      onChange={props.name !== "selectAllCases" ? handleUseCase : props.onChange}
                      checked={props.checked}/>
            <label className={styles['option-label']}
                   htmlFor={props.htmlFor}
            >
                <span>{props.children}</span>
            </label>
            {props.name !== "selectAllCases" ? <input type={props.type}
                   className={styles['result']}
                   value={isCaseUse ? props.value : ''}
                   readOnly/> : null}
        </div>
    )
}

export {Select}