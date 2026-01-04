const logger = {
  info: (msg) => console.log(`ℹ️ INFO: ${msg}`),
  error: (msg) => console.log(`🔥 ERROR: ${msg}`),
  warn: (msg) => console.log(`⚠️ WARN: ${msg}`)
};

export default logger;
