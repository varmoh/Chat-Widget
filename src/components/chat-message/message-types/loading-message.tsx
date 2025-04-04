import {motion} from "framer-motion";
import classNames from "classnames";
import styles from "../chat-message.module.scss";
import RobotIcon from "../../../static/icons/buerokratt.svg";
import {LoadingAnimationStyles} from "../LoadingAnimationStyled";

const leftAnimation = {
    animate: {opacity: 1, x: 0},
    initial: {opacity: 0, x: -20},
    transition: {duration: 0.25, delay: 0.25},
};

const LoadingMessage = (): JSX.Element => {
    return (
        <motion.div animate={leftAnimation.animate} initial={leftAnimation.initial}
                    transition={leftAnimation.transition}>
            <div className="byk-chat">
                <div className={classNames(styles.message, styles.admin)}>
                    <div className={styles.main}>
                        <div className={styles.icon}>
                            <img src={RobotIcon} alt="Robot icon"/>
                        </div>
                        <div className="byk-chat">
                        <div className={`${styles.content}`}>
                            <LoadingAnimationStyles className="bouncing-loader">
                                <div></div>
                                <div></div>
                                <div></div>
                            </LoadingAnimationStyles>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingMessage;
