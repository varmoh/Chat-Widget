import {WaitingTimeNotificationStyles} from "./WaitingTimeNotificationStyled";

const InfoIcon = () => {
    return (
        <WaitingTimeNotificationStyles>
            <div className="infoIcon">
                <svg width="2" height="18" viewBox="0 0 2 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 3M1 7L1 17" stroke="#0000F0" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </div>
        </WaitingTimeNotificationStyles>
    )
}

export default InfoIcon;