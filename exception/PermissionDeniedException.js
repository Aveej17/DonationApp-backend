class PermissionDeniedException extends Error {
    constructor(message) {
        super(message);
        this.name = "permissionDeniedException"; // Make sure the naming is consistent
        this.statusCode = 403; // Use statusCode instead of status
    }
}

module.exports = PermissionDeniedException;
