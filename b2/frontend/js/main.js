import { calculate } from '../api/calculatorApi.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const display = document.getElementById('display');
    const resultValue = document.getElementById('result-value');
    
    [number1Input, number2Input].forEach(input => {
        input.addEventListener('input', () => {
            display.textContent = input.value || '0';
            display.classList.add('changed');
            setTimeout(() => {
                display.classList.remove('changed');
            }, 300);
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const a = parseFloat(number1Input.value);
        const b = parseFloat(number2Input.value);
        const op = operationSelect.value;
        
        try {
            const result = await calculate(a, b, op);
            
            resultValue.textContent = result;
            resultValue.classList.remove('show');
            void resultValue.offsetWidth; 
            resultValue.classList.add('show');
        
            let operator;
            switch(op) {
                case 'add': operator = '+'; break;
                case 'subtract': operator = '-'; break;
                case 'multiply': operator = '×'; break;
                case 'divide': operator = '÷'; break;
            }
            display.textContent = `${a} ${operator} ${b} = ${result}`;
            
        } catch (error) {
            resultValue.textContent = 'Lỗi tính toán';
            resultValue.classList.add('error');
            console.error(error);
        }
    });
});