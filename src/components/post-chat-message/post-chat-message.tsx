import {useTranslation} from 'react-i18next';
import Button from '../button/button';
import {useAppDispatch} from '../../store';
import {resetChatState, setIdleChat} from '../../slices/chat-slice';
import {PostChatMessageStyled} from "./PostChatMessageStyled";
import {FC} from "react";

interface PostChatMessageProps {
    customMessage?: string;
}


const PostChatMessage: FC<PostChatMessageProps> = ({customMessage}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    // {customMessage || t("conversation.inactive-termination")}

    return (
        <PostChatMessageStyled>
            <div className="byk_container">
                <dialog
                    className="byk_content"
                    aria-modal="true"
                    aria-labelledby={t("notifications.idle-chat-notification")}
                >
                    <>
                        <div className="byk_title h2-style" role="heading" aria-level={2}>
                            {customMessage || t("notifications.idle-chat-notification")}
                        </div>
                        <div className="byk_actions">
                            <Button
                                title={t("header.button.close.label")}
                                onClick={() => {
                                    dispatch(
                                        setIdleChat(resetChatState)
                                    );
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
