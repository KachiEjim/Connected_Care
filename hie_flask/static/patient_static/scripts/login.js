$(document).ready(function() {
    const form = $('#signupForm');
    const errorMessage = $('#error-message');
    const baseURL = 'https://52.91.118.78';

    // Function to show error message
    function showError(input, message) {
        const error = $('<div>').addClass('error-message text-danger').text(message);
        input.parent().append(error);

        // Remove error message when input is valid
        input.on('input', function() {
            error.remove();
        });
    }

    function validateUser(email, password) {
        return $.ajax({
            url: `${baseURL}/hie_api/v1/validate`,
            type: 'POST',
            headers: {
                'Request-Version': 'HTTP/1.1',
                'Secure': 'true',
                'SameSite': 'None',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email: email,
                password: password,
                user: 'patient',
                opp: 'login'
            }),
            dataType: 'json'
        });
    }

    form.on('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        errorMessage.html('');

        // Clear previous error messages
        $('.error-message').remove();

        // Validate each field
        const fields = ['email', 'password'];
        fields.forEach(field => {
            const input = $('#' + field);
            if (!input.val() || (input.prop('type') === 'select-one' && input.val() === 'Default')) {
                isValid = false;
                showError(input, 'This field cannot be empty');
            }
        });

        const password = $('#password');
        const email = $('#email');

        if (isValid) {
            validateUser(email.val(), password.val()).done(function(response) {
                if (!response.email) {
                    showError(email, 'User not found');
                    errorMessage.html(`It looks like you don't have an account, no worries <a href="${baseURL}:5000/patient/signup">Sign up here!</a>`);
                } else if (!response.password) {
                    showError(password, 'Incorrect password.');
                } else {
                    form.submit();
                }
            }).fail(function(error) {
                console.error('Error validating user:', error);
                errorMessage.html('An error occurred while validating the user.' + error);
            });
        }
    });
});
