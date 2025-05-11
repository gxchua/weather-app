import styles from './List.module.scss';


export type Column = {
    item: React.ReactNode
    style?: React.CSSProperties
    class?: string
}

type ListProp = {
    id: string
    config: Column[]
}

//A reusable list component that takes in a config consisting of an array of column objects. Each column object represents a column in the list, and its content can be any React node.
const List = ({ id, config = [] }: ListProp) => {
    return (
        <div className={styles.list} >
            {config.map((col: Column, index: number) => (
                <div key={`${id}-${index}`} style={col.style} className={col.class}>
                    {col.item}
                </div>
            ))}
        </div>
    )
}

export default List;