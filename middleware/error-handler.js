const { StatusCodes } = require("http-status-codes");

const { CustomAPIError } = require("../errors/custom-error");
const errorHandleMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }

    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message});
    }
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err})
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandleMiddleware