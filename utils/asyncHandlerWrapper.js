// utils/handleAsync.js
export const handleAsync = (fn, options = {}) => {
  const { rethrow = true, defaultValue = null } = options;

  return (...args) =>
    Promise.resolve(fn(...args)).catch((err) => {
      const fnName = fn.name || "anonymous";
      console.error(`[ERROR] in ${fnName}:`, err);

      if (rethrow) throw err; // forward error
      return defaultValue;    // fallback value
    });
};
