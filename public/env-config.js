window._env_ = {
  RUUTER_API_URL: "http://192.168.1.80:8086/backoffice",
  NOTIFICATION_NODE_URL: "http://192.168.1.80:4040",
  ENVIRONMENT: "development", // 'developement | production'
  TIM_AUTHENTICATION_URL:
    "http://192.168.1.80:8085/oauth2/authorization/tara?callback_url=http://192.168.1.80:3000/auth/callback",
  ORGANIZATION_NAME: "TTJA",
  OFFICE_HOURS: {
    TIMEZONE: "Europe/Tallinn",
    BEGIN: 0,
    END: 24,
    DAYS: [1, 2, 3, 4, 5, 6, 7],
  },
  ENABLE_HIDDEN_FEATURES: "TRUE",
  IFRAME_TARGET_OIRGIN: "*",
};
