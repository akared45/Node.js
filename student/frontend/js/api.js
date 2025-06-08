var StudentAPI = (function() {
    const API_BASE_URL = 'http://localhost:3000/api/students';
    async function fetchStudents() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    }

    async function addStudent(studentData) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    }

    return {
        fetchStudents: fetchStudents,
        addStudent: addStudent
    };
})();