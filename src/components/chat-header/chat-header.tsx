import React, {memo, MouseEventHandler} from 'react';
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import {setIsChatOpen} from '../../slices/chat-slice';
import {showConfirmationModal} from '../../slices/widget-slice';
import Close from '../../static/icons/close.svg';
import Minimize from '../../static/icons/minimize.svg';
import Shield from '../../static/icons/shield.svg';
import {useAppDispatch} from '../../store';
import useChatSelector from '../../hooks/use-chat-selector';
import useAuthenticationSelector from '../../hooks/use-authentication-selector';
import {ChatHeaderInitialStyles, ChatHeaderStyles} from "./ChatHeaderStyled";

interface ChatHeaderType {
    detailHandler: MouseEventHandler<HTMLButtonElement>;
    isDetailSelected: boolean;
}

const ChatHeader = (props: ChatHeaderType): JSX.Element => {
    const {detailHandler, isDetailSelected} = props;
    const {t} = useTranslation();
    const {chatId} = useChatSelector();
    const {isAuthenticated} = useAuthenticationSelector();
    const minimizeChat = () => dispatch(setIsChatOpen(false));
    const dispatch = useAppDispatch();

    return (
        <ChatHeaderInitialStyles>
            <ChatHeaderStyles>
                <motion.button
                    whileHover={{scale: 1.2}}
                    className={`close_button hamburger-icon ${isDetailSelected ? 'active' : ''}`}
                    title={t('header.button.detail.label')}
                    onClick={detailHandler}
                    aria-label={t('header.button.detail.label')}
                    type="button"
                >
                    <span className={`hamburger-icon ${isDetailSelected ? 'active' : ''}`}/>
                </motion.button>
                <div className="title">
                    {chatId && isAuthenticated && (
                        <div className="shield">
                            <img src={Shield} alt={t('image.alt.text.shield.icon')}/>
                        </div>
                    )}
                    {t('widget.title')}
                </div>
                <div className="actions">
                    <button title={t('header.button.minimize.label')} onClick={minimizeChat}
                            aria-label={t('header.button.minimize.label')} type="button">
                        <img src={Minimize} alt="Minimize icon"/>
                    </button>
                    <button
                        title={t('header.button.close.label')}
                        onClick={() => {
                            chatId ? dispatch(showConfirmationModal()) : dispatch(setIsChatOpen(false))
                        }}
                        aria-label={t('header.button.close.label')}
                        type="button"
                    >
                        <img src={Close} alt={t('header.button.close.label')}/>
                    </button>
                </div>
            </ChatHeaderStyles>
        </ChatHeaderInitialStyles>
    )
        ;
};

export default memo(ChatHeader);