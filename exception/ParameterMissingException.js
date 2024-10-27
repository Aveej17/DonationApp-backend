class ParameterMissingException extends Error {
    constructor(message) {
        super(message);
        this.name = "ParameterMissingException"; // Make sure the naming is consistent
        this.statusCode = 400; // Use statusCode instead of status
    }
}

module.exports = ParameterMissingException;
