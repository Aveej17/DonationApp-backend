class UserException extends Error{
    constructor(message) {
        super(message);
        this.name = "userException";
        this.statusCode = 404;
    }
}

module.exports = UserException;