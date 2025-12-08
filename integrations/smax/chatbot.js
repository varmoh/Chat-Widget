class BykChatbot extends HTMLElement {
  constructor() {
    super();
    // TODO: Change to correct urls
    this.SMAX_CLOUD_DOMAIN = "https://smax.example.com";
    this.WIDGET_DOMAIN = "http://localhost:3003";

    this.shadow = this.attachShadow({ mode: "open" });

    this.oidcConfig = {
      clientId: "TOBLfHlm2I4Xbyof",
      redirectUri: `${this.SMAX_CLOUD_DOMAIN}/saw/ess?TENANTID=${ESMHoneycomb.TenantId}`,
      authEndpoint: `${this.SMAX_CLOUD_DOMAIN}/idm-service/oidc/authorize`,
      scope: "openid profile email",
    };

    this._authDone = false;
    this._code = null;
    this._iframe = null;
  }

  connectedCallback() {
    // Check if returning from OIDC redirect
    const params = new URLSearchParams(window.location.search);
    const currentTokenText = sessionStorage.getItem("tokentext");
    const storedTokenText = sessionStorage.getItem("stored_tokentext");
    const code = params.get("code");

    if (code && currentTokenText && currentTokenText === storedTokenText) {
      this._authDone = true;
      this._code = code;
      this.renderIframe(this._code);
    } else {
      // Render iframe in closed state
      this.renderIframe(null);
    }

    window.addEventListener("message", this._handleWindowMessage.bind(this));
  }

  async handleAuthentication() {
    const { oidcConfig } = this;
    // Track user changing e.g logout and login with different user
    const currentTokenText = sessionStorage.getItem("tokentext");
    const storedTokenText = sessionStorage.getItem("stored_tokentext");

    // CSRF protection
    const state = this.generateStateToken();

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code || (currentTokenText && currentTokenText !== storedTokenText)) {
      // No code, redirect to login
      sessionStorage.setItem("auth_state", state);
      sessionStorage.setItem("stored_tokentext", currentTokenText);

      const authUrl =
        `${oidcConfig.authEndpoint}?` +
        new URLSearchParams({
          response_type: "code",
          client_id: oidcConfig.clientId,
          redirect_uri: oidcConfig.redirectUri,
          scope: oidcConfig.scope,
          state,
        });

      window.location.href = authUrl;
      return;
    }

    if (params.get("state") !== sessionStorage.getItem("auth_state")) {
      console.error("State mismatch. Auth failed.");
      return;
    }

    this._authDone = true;
    this._code = code;

    this.renderIframe(this._code);
  }

  renderIframe(code) {
    this.shadow.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.style.alignItems = "flex-end";
    wrapper.style.display = "flex";
    wrapper.style.height = "100%";
    wrapper.style.justifyContent = "flex-end";
    wrapper.style.position = "relative";
    wrapper.style.zIndex = "9999";
    wrapper.style.width = "100%";

    const iframe = document.createElement("iframe");
    iframe.id = "byk";
    iframe.scrolling = "no";
    iframe.style.border = "none";
    iframe.style.bottom = "10px";
    iframe.style.position = "fixed";

    if (code) iframe.src = `${this.WIDGET_DOMAIN}?auth_code=${code}`;
    else iframe.src = `${this.WIDGET_DOMAIN}`;

    iframe.width = "270";
    iframe.height = "120";

    wrapper.appendChild(iframe);
    this.shadow.appendChild(wrapper);

    this._iframe = iframe;
  }

  _handleWindowMessage(e) {
    const isOpened = e.data?.isOpened;
    const isFullScreen = e.data?.isFullScreen;
    if (isOpened === undefined || !this._iframe) return;

    if (isOpened) {
      this._checkAuth(isFullScreen);
    } else {
      this._iframe.width = isFullScreen ? window.innerWidth : "270";
      this._iframe.height = isFullScreen ? window.innerHeight : "120";
    }
  }

  _checkAuth(isFullScreen) {
    if (this._authDone) {
      this._iframe.width = isFullScreen ? window.innerWidth : "480";
      this._iframe.height = isFullScreen ? window.innerHeight : "510";
    } else {
      this.handleAuthentication();
      this._iframe.width = "0";
      this._iframe.height = "0";
    }
  }

  generateStateToken() {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((x) => charset[x % charset.length])
      .join("");
  }
}

customElements.define("byk-chatbot", BykChatbot);
