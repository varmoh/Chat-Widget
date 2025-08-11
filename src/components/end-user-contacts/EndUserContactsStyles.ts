import styled from "styled-components";

export const TextAreaStyle = styled.textarea`
    width: 100%;
    outline: 0;
    border: 0;
    background: transparent;
    overflow: auto;
    resize: none;
`;

export const EndUserContactsStyle = styled.div`
    height: 100%;

    input,
    textarea {
        border: 0;
        border-bottom: 1px solid #003cff;
        padding-bottom: 5px;
        width: 100%;
    }
    
    .p-style {
        display: block;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
    }
    
    .h3-style {
        display: block;
        font-size: 1.17em;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }

    .h5-style {
        display: block;
        font-size: .83em;
        margin: 0.5rem 0 0 0;
        font-weight: bold;
    }

    .form-header {
        margin-bottom: 1rem;
    }

    .form-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        gap: 0.5rem;
    }

    form {
        height: 115%;
        width: 100%;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: -3rem;
    }

    .form-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: medium;

        .email-group,
        .phone-nr-group {
            padding-bottom: 1rem;
            width: 100%;
        }

        .comment-group {
            width: 100%;
        }

        .email-input:invalid,
        .phone-nr-input:invalid {
            border-color: #ff4800;
        }
    }

    .input-labels {
        display: flex;
        align-items: flex-start;
        justify-items: flex-start;
    }

    .missing-feeback {
        color: #ff4800;
        margin-bottom: -0.5em;
        font-size: 0.75rem;

    }
`;
