import styles from './button.module.scss';
import {FC, DetailedHTMLProps, ButtonHTMLAttributes, AriaAttributes} from "react";

export interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    title: string;
    color?: ButtonColor;
}

export enum ButtonColor {
    BLUE = 'blue',
    GRAY = 'gray',
}

const Button: FC<Props> = (props) => {
    const {
        color = ButtonColor.BLUE,
        title = '',
        ...rest
    } = props;

    return (
        <button className={`${styles.button} ${color === ButtonColor.BLUE ? styles.blue : styles.gray}`} title={title}
                type="button" color={color} {...rest} >
            {props.children}
        </button>
    )
}

export default Button