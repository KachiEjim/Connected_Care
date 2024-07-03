document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const errorMessage = document.getElementById('error-message');
    const baseURL = 'https://52.91.118.78';

        // Function to show error message
    function showError(input, message) {
            const error = document.createElement('div');
            error.className = 'error-message text-danger';
            error.innerText = message;
            input.parentNode.appendChild(error);
    
            // Remove error message when input is valid
            input.addEventListener('input', function() {
                error.remove();
            });
        }


    // Function to validate password length
    function validatePasswordLength(password) {
        return password.length >= 8;
    }

    // Function to validate password format
    function validatePasswordFormat(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return {
            hasUppercase,
            hasLowercase,
            hasNumber
        };
    }
        // Function to validate email format
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }
    
    
    // Function to validate user by making an asynchronous request
    async function validateUser(email, password) {
        const response = await fetch(`${baseURL}:5001/hie_api/v1/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                user: 'doctor',
                opp: 'signup'
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        errorMessage.innerHTML = '';

        // Clear previous error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());

        // Validate each field
        const fields = ['first_name', 'last_name', 'birthday', 'gender', 'country', 'email', 'password', 'confirm_password'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value || (input.type === 'select-one' && input.value === 'Default')) {
                isValid = false;
                showError(input, 'This field cannot be empty');
            }
        });

        // Validate email format
        const email = document.getElementById('email');
        if (email.value && !validateEmail(email.value)) {
            isValid = false;
            showError(email, 'Invalid email format');
        }

        // Validate password match
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm_password');
        if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
            isValid = false;
            showError(confirmPassword, 'Passwords do not match');
        }
        // Validate password length
        const passwordl = document.getElementById('password');
        if (passwordl.value && !validatePasswordLength(passwordl.value)) {
            isValid = false;
            showError(passwordl, 'Password must be at least 8 characters long');

        // Validate password format
            const passwordf = document.getElementById('password');
            if (passwordf.value && !validatePasswordFormat(passwordf.value)) {
                isValid = false;
                showError(passwordl, 'Password must contain at least one uppercase letter, one lowercase letter and one number');
            }
        }
        if (isValid) {
            // Perform the additional check before submitting the form
            validateUser(email.value, password.value).then(response => {
                if (response.email) {
                    // Display the login page link
                    errorMessage.innerHTML = `Email already exists. <a href="${baseURL}:5000/doctor/login">Login here</a>`;
                } else {
                    // Submit the form if all validations pass
                    form.submit();
                }
            }).catch(error => {
                console.error('Error validating user:', error);
                errorMessage.innerHTML = 'An error occurred while validating the user.' + error;
            });
        }
    });


});