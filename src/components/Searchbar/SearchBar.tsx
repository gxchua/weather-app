import { ReactNode, useEffect, useState } from "react";
import styles from './searchbar.module.scss';

type SearchBarProps = {
    id: string
    label: string
    onChange: (val: string) => void
    className?: string // Allow passing custom class for styling
}

const SearchBar = ({ id, label, onChange, className }: SearchBarProps): ReactNode => {
    const [value, setValue] = useState<string>("");

    const updateInput = (text: string): void => {
        //Update internal value
        setValue(text);
        //Inform parent about the value change
        if (!onChange) { return; }
        onChange(text);
    }

    const onClearBtnClicked = () => {
        updateInput("");
    }

    return (
        <div className={`${styles.searchBar} ${className || ''}`}>
            <div className={styles.inputWrap}>
                <label htmlFor={id} className={styles.labelText}>{label}</label>
                <input type="text" onChange={(e) => updateInput(e.target.value)} value={value} id={id}></input>
            </div>

            <span className={styles.clearBtn} onClick={onClearBtnClicked}>X</span>
        </div>
    )
}

export default SearchBar;