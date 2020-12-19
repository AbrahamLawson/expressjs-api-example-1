const httpStatus = require('http-status');

/**
 * @param  {} res Object required : Express response
 * @param  {} data Object optional : Data response
 * @description Return an object consist of status (200), message ('success') [and given data]
 */
const responseSuccess = (res, data = {}) => {
    return res.json({
        status: 200,
        message: 'success',
        ...data
    })
}

/**
 * @param  {} res Object required : Express response
 * @param  {} status Number optional : status of error - default 404
 * @description return an object consist of status and message is concordant the given status
 */
const responseError = (res, statusError = 404) => {
    return res.json({ 
        status: statusError,
        message: statusError == 404 ? 'NOT_FOUND' : httpStatus[`${statusError}_MESSAGE`]
    })
}

module.exports = {
    responseSuccess,
    responseError,
}