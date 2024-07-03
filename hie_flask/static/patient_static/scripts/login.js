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

    // Function to validate user by making an asynchronous request
    async function validateUser(email, password) {
        const response = await fetch(`${baseURL}:5001/hie_api/v1/validate`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                headers: {
                'Secure': 'true',
                'SameSite': 'None',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                user: 'patient',
                opp: 'login'

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
        const fields = ['email', 'password'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value || (input.type === 'select-one' && input.value === 'Default')) {
                isValid = false;
                showError(input, 'This field cannot be empty');
            }
        });


        const password = document.getElementById('password');

        const email = document.getElementById('email');
        if (isValid) {
            // Perform the additional check before submitting the form
            validateUser(email.value, password.value).then(response => {
                if (!response.email) {
                    // Display the login page link
                    showError(email, `User not found`);
                    errorMessage.innerHTML = `It looks like you don't have an account, no worries <a href="${baseURL}:5000/patient/signup">Sign up here!</a>`;
                } else if (!response.password) {
                    // Display the login page link
                    showError(password, `Incorrect password.`);
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