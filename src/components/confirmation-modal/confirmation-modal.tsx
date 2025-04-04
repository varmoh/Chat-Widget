import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {closeConfirmationModal} from "../../slices/widget-slice";
import {RootState, useAppDispatch} from "../../store";
import Button from "../button";
import ConfirmationModalNps from "./confirmation-modal-nps";
import ConfirmationModalDownload from "./confirmation-modal-download";
import {CHAT_EVENTS} from "../../constants";
import {ConfirmationModalStyled} from "./ConfirmationModalStyled";

export default function ConfirmationModal(): JSX.Element {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const isConfirmationModelOpen = useSelector(
        (state: RootState) => state.widget.showConfirmationModal
    );
    const [nps, setNps] = useState<{
        showNps: boolean;
        feedback: CHAT_EVENTS | null;
    }>({
        showNps: false,
        feedback: null,
    });

    if (!isConfirmationModelOpen) return <></>;

    function handleClick(option: CHAT_EVENTS) {
        if (
            option === CHAT_EVENTS.CLIENT_LEFT_WITH_ACCEPTED ||
            CHAT_EVENTS.CLIENT_LEFT_WITH_NO_RESOLUTION
        ) {
            setNps({
                ...nps,
                showNps: true,
                feedback: option,
            });
        }
    }

    return (
        <ConfirmationModalStyled>
            <div className="container">
                <dialog
                    className="content"
                    aria-modal="true"
                    aria-labelledby={t("widget.action.close-confirmation")}
                >
                    {nps.showNps === false ? (
                        <>
                            <h2 className="title">
                                {t("widget.action.close-confirmation")}
                            </h2>
                            <div className="actions">
                                <Button
                                    title={t("header.button.confirmation.yes")}
                                    onClick={() =>
                                        handleClick(CHAT_EVENTS.CLIENT_LEFT_WITH_ACCEPTED)
                                    }
                                >
                                    {t("widget.action.yes-got-answer")}
                                </Button>
                                <Button
                                    title={t("header.button.confirmation.yes")}
                                    onClick={() =>
                                        handleClick(CHAT_EVENTS.CLIENT_LEFT_WITH_NO_RESOLUTION)
                                    }
                                >
                                    {t("widget.action.yes-no-answer")}
                                </Button>
                                <Button
                                    title={t("header.button.confirmation.no")}
                                    onClick={() => dispatch(closeConfirmationModal())}
                                >
                                    {t("widget.action.no-dont-close")}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <ConfirmationModalNps npsFeedback={nps}/>
                            <ConfirmationModalDownload/>
                        </>
                    )}
                </dialog>
            </div>
        </ConfirmationModalStyled>
    );
}
