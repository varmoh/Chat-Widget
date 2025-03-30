import styled from "styled-components";
import StyledButton from "../components/styled-components/styled-button";
import {motion} from "framer-motion";

export const ChatFeedbackStyle = styled.div`
    height: auto;
    padding-top: 0.8em;

    border-top: 2px solid #f0f1f2;
    flex-direction: column;
    display: flex;
    color: blue;

    .feedback-paragraph {
        margin: 0 0.8em;
        font-size: 14px;
    }

    .feedback-paragraph.above:after {
        content: "*";
        color: #ff4800;
    }

    .feedback-btn {
        padding: 0.5rem;
        width: 32px;
        vertical-align: baseline;
        margin: 0;
    }

    .feedback-box-input {
        justify-content: space-around;
        display: flex;
        flex-flow: row nowrap;
        margin: 1rem 0.8em 2rem 0.8em;
    }

    .missing-feeback {
        color: #ff4800;
        margin: 0 0.8em -0.5rem 0.8em;
        font-size: 0.75rem;
    }
`;

export const TermsAndConditionsStyles = styled(StyledButton)`
  display: flex;
  align-items: center;

  .external_link_icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PGcgZmlsbD0iIzAwM0NGRiI+PHBhdGggZD0iTTY5LjM3IDU0LjExdjI1LjgzYTIuNjEgMi42MSAwIDAxLTIuNiAyLjZIMjBhMi42MSAyLjYxIDAgMDEtMi42LTIuNnYtNDYuOGEyLjYxIDIuNjEgMCAwMTIuNi0yLjZoMzEuNDlWMjRIMTQuMTJhMy4yNiAzLjI2IDAgMDAtMy4yNSAzLjI1djU4LjVBMy4yNiAzLjI2IDAgMDAxNC4xMiA4OWg1OC41YTMuMjYgMy4yNiAwIDAwMy4yNS0zLjI1VjU0LjExeiIvPjxwYXRoIGQ9Ik01MC43NSA1NC44NWwzMC42Mi0zMC42MlY1MWEzLjkxIDMuOTEgMCAwMDMuOSAzLjg5QTMuODYgMy44NiAwIDAwODkuMTMgNTFWMTQuODhBMy44NiAzLjg2IDAgMDA4NS4yNyAxMUg0OS4xM2EzLjg3IDMuODcgMCAxMDAgNy43M2gyNi43Nkw0NS4yNiA0OS4zN2EzLjg4IDMuODggMCAxMDUuNDkgNS40OHoiLz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    width: 16px;
    margin-left: .25rem;
    margin-top: -.25rem;
    height: 16px;
    transition: 250ms background-image;
  }

  :hover {
    .external_link_icon {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PGcgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik02OS4zNyA1NC4xMXYyNS44M2EyLjYxIDIuNjEgMCAwMS0yLjYgMi42SDIwYTIuNjEgMi42MSAwIDAxLTIuNi0yLjZ2LTQ2LjhhMi42MSAyLjYxIDAgMDEyLjYtMi42aDMxLjQ5VjI0SDE0LjEyYTMuMjYgMy4yNiAwIDAwLTMuMjUgMy4yNXY1OC41QTMuMjYgMy4yNiAwIDAwMTQuMTIgODloNTguNWEzLjI2IDMuMjYgMCAwMDMuMjUtMy4yNVY1NC4xMXoiLz48cGF0aCBkPSJNNTAuNzUgNTQuODVsMzAuNjItMzAuNjJWNTFhMy45MSAzLjkxIDAgMDAzLjkgMy44OUEzLjg2IDMuODYgMCAwMDg5LjEzIDUxVjE0Ljg4QTMuODYgMy44NiAwIDAwODUuMjcgMTFINDkuMTNhMy44NyAzLjg3IDAgMTAwIDcuNzNoMjYuNzZMNDUuMjYgNDkuMzdhMy44OCAzLjg4IDAgMTA1LjQ5IDUuNDh6Ii8+PC9nPjwvc3ZnPg==);
    }
`;

export const WidgetDetailsStyles = styled(motion.div)`
  display: flex;
  overflow: auto;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  margin: auto;

  .eu-sf-logo {
    margin-top: 3px;
  }

  .btn-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;

    .authenticateWithTara {
      width: 70%;
      margin: 0.5rem;
    }

    .termsAndConditions {
      padding: 0.5rem;
      margin-bottom: 0.8rem;
      width: 70%;
      justify-content: center;
    }
  }

  .flags > * {
    padding: 0 0.5rem;
    margin-bottom: 1rem;
  }

  .button {
    padding: 1rem 0.5rem;
    overflow: hidden;

    &.second {
      margin-top: -1rem;
    }
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-text {
    padding: 0 0.5rem;
    margin-top: -1rem;

    p {
      font-size: small;
      margin-top: -1rem;
    }
  }

  .link-icon {
    padding-left: 0.5rem;
  }
`;