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
                      onChange={handleUseCase}/>
            <label className={styles['option-label']}
                   htmlFor={props.htmlFor}
            >
                {props.children}
            </label>
            <input type={props.type}
                   className={styles['result']}
                   value={isCaseUse ? props.value : ''}
                   readOnly/>
        </div>
    )
}

export {Select}