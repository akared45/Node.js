document.addEventListener('DOMContentLoaded', async () => {
    await loadStudents();
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
});

async function loadStudents() {
    try {
        const students = await StudentAPI.fetchStudents();
        renderStudents(students);
    } catch (error) {
        showAlert('Error loading student list', 'error');
    }
}

function renderStudents(students) {
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.class}</td>
            <td>${formatGender(student.gender)}</td>
            <td>${formatDate(student.birthdate)}</td>
        `;
        tbody.appendChild(row);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
        name: form.name.value.trim(),
        age: parseInt(form.age.value),
        class: form.class.value.trim(),
        gender: form.gender.value,
        birthdate: form.birthdate.value
    };
    console.log(formData);
    try {
        await StudentAPI.addStudent(formData);
        form.reset();
        await loadStudents();
        showAlert('Student added successfully!', 'success');
    } catch (error) {
        showAlert('An error occurred while adding student', 'error');
    }
}

function formatGender(gender) {
    const genders = {
        male: 'Nam',
        female: 'Nữ',
        other: 'Khác'
    };
    return genders[gender] || gender;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.prepend(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}