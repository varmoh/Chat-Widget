import {SyntheticEvent, useState} from 'react';
import styles from './stars.module.scss';

interface Props {
    onClick: (e: number) => any;
}

const Stars = ({onClick}: Props) => {
    const [selected, setSelected] = useState<number>(0)

    function handleClick(e: SyntheticEvent, i: number) {
        e.preventDefault();
        setSelected(i)
        onClick(i + 1)
    }

    return (
        <>
            <div className={styles.container}>
                {[...Array(5)].map((e, i) =>
                    <svg className={`${selected! >= i ? styles.selected : ""}`} key={i}
                         onClick={(e) => handleClick(e, i)}
                         width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.524 27.0932L17 24.5322L7.111 31.7172L10.889 20.0922L1 12.9082H13.223L17 1.2832L20.777 12.9082H33L23.111 20.0922L26.889 31.7172"
                            stroke="#003CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </div>
        </>
    )
}

export default Stars