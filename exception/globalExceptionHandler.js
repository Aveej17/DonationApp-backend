const UserException = require("./UserException"); // Ensure spelling is correct
const ParameterMissingException = require("./ParameterMissingException");
const PermissionDeniedException = require("./PermissionDeniedException");

const globalErrorHandler = (err, req, res, next) => {
    console.log("Global Error Handler Gets Called"); // Debugging

    // Log the error stack trace for debugging
    console.error("Error: ", err.stack);

    // Check if it's a UserCreationException
    if (err instanceof UserException) {
        return res.status(err.statusCode).json({
            status: "error",
            errorType: err.name,
            message: err.message,
            timestamp: new Date().toISOString(),
        });
    }


    // Check if it's a PermissionDeniedException
    if (err instanceof PermissionDeniedException) {
        return res.status(err.statusCode).json({
            status: "error",
            errorType: err.name,
            message: err.message,
            timestamp: new Date().toISOString(),
        });
    }

    // Check if it's a ParameterMissingException
    if (err instanceof ParameterMissingException) {
        return res.status(err.statusCode).json({
            status: "error",
            errorType: err.name,
            message: err.message,
            timestamp: new Date().toISOString(),
        });
    }

    // Default error handling
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
        timestamp: new Date().toISOString(),
    });
};

module.exports = globalErrorHandler;
