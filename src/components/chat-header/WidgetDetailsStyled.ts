import styled from "styled-components";
import {motion} from "framer-motion";

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