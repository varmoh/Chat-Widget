import React, {ReactElement} from 'react';
import {motion} from 'framer-motion';
import {ChatMessageStyled} from "../ChatMessageStyled";

const leftAnimation = {
    animate: {opacity: 1, x: 0},
    initial: {opacity: 0, x: -20},
    transition: {duration: 0.25, delay: 0.25},
};

const EventMessage = (props: { content: ReactElement }): JSX.Element => {
    const {content} = props;

    return (
        <motion.div animate={leftAnimation.animate} initial={leftAnimation.initial}
                    transition={leftAnimation.transition}>
            <ChatMessageStyled className={`message event`}>
                <div>
                    <div aria-live="polite">{content}</div>
                </div>
            </ChatMessageStyled>
        </motion.div>
    );
};

export default EventMessage;
