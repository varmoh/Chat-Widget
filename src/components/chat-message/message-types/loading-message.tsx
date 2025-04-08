import {motion} from "framer-motion";
import RobotIcon from "../../../static/icons/buerokratt.svg";
import {LoadingAnimationStyles} from "../LoadingAnimationStyled";
import {ChatMessageStyled} from "../ChatMessageStyled";

const leftAnimation = {
    animate: {opacity: 1, x: 0},
    initial: {opacity: 0, x: -20},
    transition: {duration: 0.25, delay: 0.25},
};

const LoadingMessage = (): JSX.Element => {
    return (
        <motion.div animate={leftAnimation.animate} initial={leftAnimation.initial}
                    transition={leftAnimation.transition}>
            <ChatMessageStyled className="admin">
                <div className="message">
                    <div className="main">
                        <div className="icon">
                            <img src={RobotIcon} alt="Robot icon"/>
                        </div>
                        <div>
                            <div className="content">
                                <LoadingAnimationStyles>
                                    <div className="bouncing-loader">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </LoadingAnimationStyles>
                            </div>
                        </div>
                    </div>
                </div>
            </ChatMessageStyled>
        </motion.div>
    );
};

export default LoadingMessage;
