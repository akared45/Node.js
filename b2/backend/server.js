import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/calculate', (req, res) => {
  const { a, b, op } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: "'a' and 'b' must be numbers" });
  }

  try {
    let result;
    switch (op) {
      case 'add': result = a + b; break; 
      case 'subtract': result = a - b; break; 
      case 'multiply': result = a * b; break;
      case 'divide':
        if (b === 0) throw new Error("Cannot divide by 0");
        result = a / b;
        break;
      default: throw new Error("Invalid math operation");
    }
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server API running at http://localhost:${PORT}`);
});
