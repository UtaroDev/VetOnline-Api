"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', routes_1.router);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server on in port ${port}`);
});
