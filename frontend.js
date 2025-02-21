// login function
function loginbtn(event) {
    event.preventDefault();
    const lgn_email = document.querySelector('#email')?.value;
    const lgn_pswd = document.querySelector('#password')?.value;

    if (!lgn_email || !lgn_pswd) {
        alert("Please enter both email and password.");
        return;
    }

    fetch('http://49.47.249.190:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: lgn_email, password: lgn_pswd })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User does not exist') {
            alert('User does not exist, please register.');
        } else if (data.message === 'Incorrect password') {
            alert('Login credentials are incorrect.');
        } else if (data.message === 'Login successful') {
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        }
    })
    .catch(error => console.error('Error:', error));
}

// Signup Function
function signupbtn(event) {
    event.preventDefault();
    const sgnup_name = document.querySelector('#name')?.value;
    const sgnup_email = document.querySelector('#s_email')?.value;
    const sgnup_tel = document.querySelector('#phone_no')?.value;
    const sgnup_pswd = document.querySelector('#s_password')?.value;

    if (!sgnup_name || !sgnup_email || !sgnup_tel || !sgnup_pswd) {
        alert("Please fill in all fields.");
        return;
    }

    fetch('http://49.47.249.190:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: sgnup_name, email: sgnup_email, phone_no: sgnup_tel, password: sgnup_pswd })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User already exists') {
            alert('User already exists, please login.');
        } else if (data.message === 'Registration successful') {
            alert('Registration successful, please login.');
            window.location.href = 'index.html';
        }
    })
    .catch(error => console.error('Error:', error));
}

