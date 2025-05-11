import { ReactNode, useState } from "react";
import styles from './searchbar.module.scss';

type SearchBarProps = {
    id: string
    label: string
    onChange: (val: string) => void
    onEnter?: (val: string) => void;
    className?: string // Allow passing custom class for styling
}

const SearchBar = ({ id, label, onChange, onEnter, className }: SearchBarProps): ReactNode => {
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
            onEnter(value);
        }
    };

    return (
        <div className={`${styles.searchBar} ${className || ''}`}>
            <div className={styles.inputWrap}>
                <label htmlFor={id} className={styles.labelText}>{label}</label>
                <input
                    type="text"
                    onChange={(e) => updateInput(e.target.value)}
                    value={value}
                    id={id}
                    onKeyDown={handleKeyDown}></input>
            </div>

            {value && <button className={styles.clearBtn} onClick={onClearBtnClicked}></button>}
        </div>
    )
}

export default SearchBar;