const unsuccessResponse = require('./unsuccessResponse');
module.exports = (req, res) => {
    let msg = "Response generated successfully";
    if (!res.locals.finalResponse) {
        msg = "finalResponse not set";
        const err = new Error("finalResponse not set")
        unsuccessResponse(err, req, res)
        return

    } else {
        if (res.locals.message) {
            msg = res.locals.message;
        }
    }
    const response = {
        success: true,
        displayMessage: res.locals.displayMessage || "",
        message: msg,
        description: "NAX-0000",
        resultObj: res.locals.finalResponse || {}
    }
    if (Object.keys(response).length == 0) {
        delete response.errorObj;
    }
    res.send(response)
}