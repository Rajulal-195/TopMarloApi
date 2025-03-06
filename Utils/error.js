// export const errorHandler = (statusCode, message) => {
//     const error = newError();
//     error.message;
//     error.statusCode;
//     return error
// }

export const errorHandler = (status, message) => {
    const err = new Error(message);
    err.statusCode = status;
    return err;
};