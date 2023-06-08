"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./lib/logger");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    logger_1.logger.info('Handling request for /');
    res.send('Hello World!');
});
app.listen(3000, () => {
    logger_1.logger.info('App is listening on port 3000');
});
