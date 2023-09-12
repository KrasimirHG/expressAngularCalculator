"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
const staticFilesPath = path_1.default.join(__dirname, '../', 'angularCalculator', 'dist', 'angular-calculator');
app.use(express_1.default.static(staticFilesPath));
app.post('/calculate', (req, res) => {
    let result;
    const { operand1, operand2, operation, maxDigits = 11 } = req.body;
    if ((typeof operand1 !== 'number') || (typeof operand2 !== 'number') || !operation) {
        return res.status(400).json({ msg: 'Mandatory parameter is missing, Sorry..' });
    }
    switch (operation) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case 'x':
            result = operand1 * operand2;
            if (result.toString().length > maxDigits) {
                result = 'Max range exceeded';
            }
            break;
        case '/':
            result = Number((operand1 / operand2).toString().substring(0, maxDigits));
            break;
    }
    return res.status(200).json({ result });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
