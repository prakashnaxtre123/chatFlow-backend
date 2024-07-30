module.exports = (error, req, res, next) => {
    console.log("error-naxtre");
    console.log(error);

    error.statusCode = error.statusCode || 500
    let response = {
        success: false,
        displayMessage: error.displayMessage || "Sorry! we could not process your request now",
        err_type: error.name,
        message: error.message,
        description: error.description || "ERR-3333",
        errorObj: error.errObj || {}
    }
    if (Object.keys(response).length == 0) {
        delete response.errorObj;
    }
    res.status(error.statusCode).send(response)

}