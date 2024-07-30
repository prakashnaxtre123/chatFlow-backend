class BaseError extends Error {
    constructor(message, displayMessage, errObj, name, description, statusCode) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.message = message;
        this.displayMessage = displayMessage;
        this.errObj = errObj;
        this.statusCode = statusCode;
        this.name = name;
        this.description = description;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

module.exports = BaseError