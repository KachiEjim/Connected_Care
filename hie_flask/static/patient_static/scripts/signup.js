document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const errorMessage = document.getElementById('error-message');

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

        if (isValid) {
            // Submit the form if all validations pass
            form.submit();
        }
    });

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

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});