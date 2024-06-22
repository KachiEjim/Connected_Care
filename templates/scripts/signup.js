document.addEventListener("DOMContentLoaded", () => {
    const userName = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const signupForm = document.getElementById("signupForm");
    const radioButtons = document.querySelectorAll('input[name="role"]');

    // Add event listener for the form submission
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Check which radio button is selected
        let selectedRole;
        radioButtons.forEach((rb) => {
            if (rb.checked) {
                selectedRole = rb.value;
            }
        });

        // Display the selected role
        if (selectedRole) {
            alert(`You selected: ${selectedRole}`);
        } else {
            alert('Please select a role.');
        }

        // Validate the form fields
        let valid = true;

        // username validation
        if (userName.value === "" || userName.value === null) {
            nameError.textContent = "Enter Your Name **";
            valid = false;
        } else {
            nameError.textContent = "";
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.match(emailRegex)) {
            emailError.textContent = "Invalid email address **";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        // password validation
        if (password.value === "") { 
            passwordError.textContent = "Password cannot be empty **";
            valid = false;
        } else if (password.value.length <= 5) { 
            passwordError.textContent = "Password must be more than 5 characters **";
            valid = false;
        } else if (password.value.length >= 20) { 
            passwordError.textContent = "Password must not be more than 20 characters **";
            valid = false;
        } else if (password.value === "password") {
            passwordError.textContent = "Password cannot be 'password' **";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        // If the form is valid, submit it (or handle it as needed)
        if (valid && selectedRole) {
            console.log('Form is valid and ready for submission.');
            // Here you can proceed with form submission or further processing
        }
    });
});
