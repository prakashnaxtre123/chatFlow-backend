const BaseError = require('./baseError');
class UnauthorizedError extends BaseError {
    constructor(
        message,
        displayMessage = "You are not authorized",
        errObj = {},
        name = "Unauthorized",
        description = 'NX-4011',
        statusCode = 401,
    ) {
        super(message, displayMessage, errObj, name, description, statusCode);
    }
}

class ValidationError extends BaseError {
    constructor(
        message,
        displayMessage = "You are not authorized",
        errObj = {},
        name = "Unauthorized",
        description = 'NX-4011',
        statusCode = 401,
    ) {
        super(message, displayMessage, errObj, name, description, statusCode);
        if (this.message == "") {
            this.message = "Validation Failed"
        }
        if (this.displayMessage == "") {
            this.displayMessage = "You are not authorized";
        }
    }
}

class WrongInputError extends BaseError {
    constructor(
        message,
        displayMessage = "Invalid Inputs",
        errObj = {},
        name = "WrongInputError",
        description = 'NX-4001',
        statusCode = 400,
    ) {
        super(message, displayMessage, errObj, name, description, statusCode);
        if (this.message == "") {
            this.message = "Request failed"
        }
        if (this.displayMessage == "") {
            this.displayMessage = "Invalid Inputs";
        }
    }
}

class FileUploadError extends BaseError {
    constructor(
        message,
        errObj = {},
        name = "FileUploadError",
        displayMessage = "Error in uploading file",
        statusCode = 400,
        description = 'NX-5003',
    ) {
        super(message, displayMessage, errObj, name, description, statusCode)
    }
}

module.exports = {
    UnauthorizedError,
    ValidationError,
    FileUploadError,
    WrongInputError
}