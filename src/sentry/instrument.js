const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN_BFF,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  sendDefaultPii: true,
});