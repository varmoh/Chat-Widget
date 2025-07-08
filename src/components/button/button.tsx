import {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC,} from 'react';
import {ButtonStyles} from "./ButtonStyled";

export interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
        AriaAttributes {
    title: string;
    color?: ButtonColor;
    onClick?: () => void;
}

export enum ButtonColor {
    BLUE = 'blue',
    GRAY = 'gray',
}

const Button: FC<Props> = (props) => {
    const {color = ButtonColor.BLUE, title = '', onClick, ...rest} = props;

    return (
        <ButtonStyles>
            <button
                className={`button ${
                    color === ButtonColor.BLUE ? "blue" : "gray"
                }`}
                title={title}
                type="button"
                color={color}
                onClick={onClick}
                {...rest}
            >
                {props.children}
            </button>
        </ButtonStyles>
    );
};

export default Button;
