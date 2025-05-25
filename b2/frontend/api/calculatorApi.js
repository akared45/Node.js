export const calculate = async (a, b, op) => {
    try {
        const response = await fetch('http://localhost:3000/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ a, b, op })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error from server");
        }

        const { result } = await response.json();
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(`Calculation error: ${error.message}`);
    }
};