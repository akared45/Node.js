import express, { json } from 'express';
import calculate from './calculator.js';

const app = express();
app.use(json());

app.get('/api/calculate', (req, res) => {
    const { a, b, op } = req.query;
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA)) return res.status(400).json({ error: "First number is invalid" });
    if (isNaN(numB)) return res.status(400).json({ error: "Invalid second number" });

    try {
        let result;
        switch (op) {
            case 'add':
                result = calculate.add(numA, numB);
                break;
            case 'subtract':
                result = calculate.subtract(numA, numB);
                break;
            case 'multiply':
                result = calculate.multiply(numA, numB);
                break;
            case 'divide':
                result = calculate.divide(numA, numB);
                break;
            default:
                throw new Error("Invalid math operation (use: add/subtract/multiply/divide)");
        }

        res.json({ a: numA, b: numB, operation: op, result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/api/calculate`);
});
