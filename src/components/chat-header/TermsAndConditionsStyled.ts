import styled from "styled-components";
import StyledButton from "../styled-components/styled-button";

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