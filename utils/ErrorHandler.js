export const handleError = (err, res = null) => {
	// Log error

	console.error(`[ERROR] in ${err.funcName || "anonymous"}: ${err.message}`);

	// Send HTTP response if res is provided
	if (res) {
		return res.status(err.status || 500).json({
			success: false,
			message: err.message || "Internal Server Error",
		});
	}

	// Otherwise, just return error object
	return err;
};