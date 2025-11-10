window._env_ = {
  RUUTER_API_URL: "http://localhost:8086/backoffice",
  NOTIFICATION_NODE_URL: "http://localhost:4040",
  ENVIRONMENT: "development", // 'developement | production'
  TIM_AUTHENTICATION_URL: "http://localhost:8085/oauth2/authorization/tara",
  ORGANIZATION_NAME: "TTJA",
  OFFICE_HOURS: {
    TIMEZONE: "Europe/Tallinn",
    BEGIN: 0,
    END: 24,
    DAYS: [1, 2, 3, 4, 5, 6, 7],
  },
  ENABLE_HIDDEN_FEATURES: "TRUE",
  SMAX_INTEGRATION: { enabled: false },
  FEEDBACK_RATING_COLORS_ENABLED: "FALSE",
  ENABLE_MULTI_DOMAIN: "FALSE",
  STREAM_TYPING_SPEED: 30, // in milliseconds - lower is faster
  IFRAME_TARGET_OIRGIN: "*",
};
