import {useTranslation} from 'react-i18next';
import Button from '../button/button';
import {useAppDispatch} from '../../store';
import {resetChatState, resetState, setChatId, setIdleChat, setIsChatOpen} from '../../slices/chat-slice';
import {PostChatMessageStyled} from "./PostChatMessageStyled";
import {FC} from "react";

interface PostChatMessageProps {
    customMessage?: string;
}


const PostChatMessage: FC<PostChatMessageProps> = ({customMessage}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    return (
        <PostChatMessageStyled>
            <div className="byk_container">
                <dialog
                    className="byk_content"
                    aria-modal="true"
                    aria-labelledby={t("notifications.post-chat-notification")}
                >
                    <>
                        <div className="byk_title h2-style" role="heading" aria-level={2}>
                            {customMessage || t("notifications.post-chat-notification")}
                        </div>
                        <div className="byk_actions">
                            <Button
                                title={t("header.button.close.label")}
                                onClick={() => {
                                    dispatch(setChatId(""));
                                    dispatch(setIsChatOpen(false));
                                    setIdleChat(resetChatState)
                                    dispatch(resetState());
                                }}
                            >
                                {t("header.button.close.label")}
                            </Button>
                        </div>
                    </>
                </dialog>
            </div>
        </PostChatMessageStyled>
    );
};

export default PostChatMessage;
