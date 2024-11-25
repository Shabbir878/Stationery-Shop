"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorResponse = void 0;
const formatErrorResponse = (error) => {
    if (error.name === 'ZodError') {
        return {
            name: 'ValidationError',
            errors: error.errors.reduce((acc, err) => {
                acc[err.path.join('.')] = {
                    message: err.message,
                    name: 'ValidatorError',
                    properties: {
                        message: err.message,
                        type: err.code,
                    },
                    kind: err.code,
                    path: err.path.join('.'),
                };
                return acc;
            }, {}),
        };
    }
    return {
        name: error.name || 'Error',
        message: error.message || 'An unexpected error occurred',
    };
};
exports.formatErrorResponse = formatErrorResponse;
