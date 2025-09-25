import { motion } from "framer-motion";
import RobotIcon from "../../../static/icons/buerokratt.svg";
import { LoadingAnimationStyles } from "../LoadingAnimationStyled";
import { ChatMessageStyled } from "../ChatMessageStyled";

const LoadingMessage = (): JSX.Element => {
  return (
    <motion.div>
      <ChatMessageStyled className="admin">
        <div className="message">
          <div className="main">
            <div className="icon">
              <img src={RobotIcon} alt="Robot icon" />
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
