class APIResponse {
    constructor(statusCode = 200, data = null, message = "Success") {
        this.status = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default APIResponse;
