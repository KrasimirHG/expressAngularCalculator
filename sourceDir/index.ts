import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app: Express = express();
const port = 3000;

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

const staticFilesPath = path.join(__dirname, '../', 'angularCalculator', 'dist', 'angular-calculator');
app.use(express.static(staticFilesPath));

app.post('/calculate', (req: Request, res: Response) => {
    let result;
    const {operand1, operand2, operation, maxDigits = 11} = req.body;
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
    return res.status(200).json({result});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
