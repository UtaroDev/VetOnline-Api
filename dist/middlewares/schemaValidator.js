"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const schemaValidator = (schema) => (req, _res, next) => {
    try {
        schema.parse({ body: req.body, query: req.query, params: req.params });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.schemaValidator = schemaValidator;
