class ApiError extends Error {
    constructor(statusCode = 500, message, errors = []) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors; // Optional: array of specific validation/logic errors
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
