// DOM Elements
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const resetFormBtn = document.getElementById('resetForm');

// Input elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');
const termsCheckbox = document.getElementById('terms');
const newsletterCheckbox = document.getElementById('newsletter');

// Password toggle buttons
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

// Password strength elements
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const passwordRequirements = document.getElementById('passwordRequirements');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const phoneError = document.getElementById('phoneError');
const termsError = document.getElementById('termsError');

// Form validation state
let formState = {
    fullName: { valid: false, value: '' },
    email: { valid: false, value: '' },
    password: { valid: false, value: '' },
    confirmPassword: { valid: false, value: '' },
    phone: { valid: true, value: '' }, // Optional field
    terms: { valid: false, value: false }
};

// Event Listeners

// 1. Input field focus and blur events
[fullNameInput, emailInput, passwordInput, confirmPasswordInput, phoneInput].forEach(input => {
    input.addEventListener('focus', handleInputFocus);
    input.addEventListener('blur', handleInputBlur);
    input.addEventListener('input', handleInputChange);
});

// 2. Password visibility toggle
togglePasswordBtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, togglePasswordBtn));
toggleConfirmPasswordBtn.addEventListener('click', () => togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn));

// 3. Password strength validation (real-time)
passwordInput.addEventListener('input', validatePasswordStrength);

// 4. Checkbox events
termsCheckbox.addEventListener('change', validateTerms);
newsletterCheckbox.addEventListener('change', handleNewsletterChange);

// 5. Form submission
form.addEventListener('submit', handleFormSubmission);

// 6. Reset form
resetFormBtn.addEventListener('click', resetForm);

// 7. Terms link click
document.getElementById('termsLink').addEventListener('click', handleTermsClick);

// Event Handler Functions

function handleInputFocus(event) {
    const input = event.target;
    input.parentElement.classList.add('focused');
}

function handleInputBlur(event) {
    const input = event.target;
    input.parentElement.classList.remove('focused');
    
    // Validate the field when user leaves it
    validateField(input);
}

function handleInputChange(event) {
    const input = event.target;
    const fieldName = input.name;
    
    // Update form state
    formState[fieldName].value = input.value;
    
    // Real-time validation for certain fields
    if (fieldName === 'fullName') {
        validateFullName(input.value);
    } else if (fieldName === 'email') {
        validateEmail(input.value);
    } else if (fieldName === 'password') {
        validatePassword(input.value);
    } else if (fieldName === 'confirmPassword') {
        validateConfirmPassword(input.value);
    } else if (fieldName === 'phone') {
        validatePhone(input.value);
    }
    
    // Update submit button state
    updateSubmitButtonState();
}

function validateField(input) {
    const fieldName = input.name;
    
    switch (fieldName) {
        case 'fullName':
            validateFullName(input.value);
            break;
        case 'email':
            validateEmail(input.value);
            break;
        case 'password':
            validatePassword(input.value);
            break;
        case 'confirmPassword':
            validateConfirmPassword(input.value);
            break;
        case 'phone':
            validatePhone(input.value);
            break;
    }
}

function validateFullName(value) {
    const isValid = value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value.trim());
    formState.fullName.valid = isValid;
    
    if (isValid) {
        fullNameInput.classList.remove('invalid');
        fullNameInput.classList.add('valid');
        nameError.textContent = '';
    } else {
        fullNameInput.classList.remove('valid');
        fullNameInput.classList.add('invalid');
        nameError.textContent = 'Please enter a valid full name (at least 2 characters, letters only)';
    }
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    formState.email.valid = isValid;
    
    if (isValid) {
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        emailError.textContent = '';
    } else {
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
        emailError.textContent = 'Please enter a valid email address';
    }
}

function validatePassword(value) {
    const requirements = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    };
    
    const isValid = Object.values(requirements).every(req => req);
    formState.password.valid = isValid;
    
    // Update password requirements display
    updatePasswordRequirements(requirements);
    
    if (isValid) {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        passwordError.textContent = '';
    } else {
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
        passwordError.textContent = 'Password does not meet all requirements';
    }
    
    // Validate confirm password if it has a value
    if (confirmPasswordInput.value) {
        validateConfirmPassword(confirmPasswordInput.value);
    }
}

function validateConfirmPassword(value) {
    const isValid = value === passwordInput.value && value !== '';
    formState.confirmPassword.valid = isValid;
    
    if (isValid) {
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordInput.classList.add('valid');
        confirmPasswordError.textContent = '';
    } else {
        confirmPasswordInput.classList.remove('valid');
        confirmPasswordInput.classList.add('invalid');
        if (value === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
        } else {
            confirmPasswordError.textContent = 'Passwords do not match';
        }
    }
}

function validatePhone(value) {
    if (value === '') {
        // Phone is optional
        formState.phone.valid = true;
        phoneInput.classList.remove('invalid', 'valid');
        phoneError.textContent = '';
        return;
    }
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const isValid = phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
    formState.phone.valid = isValid;
    
    if (isValid) {
        phoneInput.classList.remove('invalid');
        phoneInput.classList.add('valid');
        phoneError.textContent = '';
    } else {
        phoneInput.classList.remove('valid');
        phoneInput.classList.add('invalid');
        phoneError.textContent = 'Please enter a valid phone number';
    }
}

function validateTerms() {
    const isValid = termsCheckbox.checked;
    formState.terms.valid = isValid;
    
    if (isValid) {
        termsError.textContent = '';
    } else {
        termsError.textContent = 'You must agree to the terms and conditions';
    }
    
    updateSubmitButtonState();
}

function validatePasswordStrength(event) {
    const password = event.target.value;
    let strength = 0;
    let strengthClass = '';
    let strengthLabel = '';
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    
    if (strength <= 25) {
        strengthClass = 'weak';
        strengthLabel = 'Weak';
    } else if (strength <= 50) {
        strengthClass = 'fair';
        strengthLabel = 'Fair';
    } else if (strength <= 75) {
        strengthClass = 'good';
        strengthLabel = 'Good';
    } else {
        strengthClass = 'strong';
        strengthLabel = 'Strong';
    }
    
    strengthFill.className = `strength-fill ${strengthClass}`;
    strengthText.textContent = `Password strength: ${strengthLabel}`;
}

function updatePasswordRequirements(requirements) {
    const reqElements = {
        length: document.getElementById('reqLength'),
        uppercase: document.getElementById('reqUppercase'),
        lowercase: document.getElementById('reqLowercase'),
        number: document.getElementById('reqNumber'),
        special: document.getElementById('reqSpecial')
    };
    
    Object.keys(requirements).forEach(req => {
        const element = reqElements[req];
        if (requirements[req]) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    });
}

function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function handleNewsletterChange(event) {
    console.log('Newsletter subscription:', event.target.checked ? 'Subscribed' : 'Not subscribed');
}

function updateSubmitButtonState() {
    const allFieldsValid = Object.values(formState).every(field => field.valid);
    submitBtn.disabled = !allFieldsValid;
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    // Final validation
    validateField(fullNameInput);
    validateField(emailInput);
    validateField(passwordInput);
    validateField(confirmPasswordInput);
    validateField(phoneInput);
    validateTerms();
    
    if (Object.values(formState).every(field => field.valid)) {
        // Simulate form submission
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Log form data
            console.log('Form submitted successfully!');
            console.log('Form data:', {
                fullName: formState.fullName.value,
                email: formState.email.value,
                phone: formState.phone.value,
                newsletter: newsletterCheckbox.checked
            });
        }, 2000);
    }
}

function resetForm() {
    // Reset form state
    formState = {
        fullName: { valid: false, value: '' },
        email: { valid: false, value: '' },
        password: { valid: false, value: '' },
        confirmPassword: { valid: false, value: '' },
        phone: { valid: true, value: '' },
        terms: { valid: false, value: false }
    };
    
    // Reset form elements
    form.reset();
    
    // Reset visual states
    [fullNameInput, emailInput, passwordInput, confirmPasswordInput, phoneInput].forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    
    // Reset error messages
    [nameError, emailError, passwordError, confirmPasswordError, phoneError, termsError].forEach(error => {
        error.textContent = '';
    });
    
    // Reset password strength
    strengthFill.className = 'strength-fill';
    strengthText.textContent = 'Password strength';
    
    // Reset password requirements
    document.querySelectorAll('#passwordRequirements li').forEach(li => {
        li.classList.remove('valid');
    });
    
    // Reset submit button
    submitBtn.textContent = 'Create Account';
    submitBtn.disabled = true;
    
    // Show form again
    form.style.display = 'flex';
    successMessage.classList.add('hidden');
}

function handleTermsClick(event) {
    event.preventDefault();
    alert('Terms and Conditions:\n\n1. You agree to use this service responsibly\n2. Your data will be protected\n3. You can unsubscribe at any time\n\nThis is a demo form for practicing event listeners!');
}

// Initialize form state
updateSubmitButtonState();

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 User Registration Form loaded!');
    console.log('📝 Practice your event listeners with this interactive form!');
    
    // Add a subtle animation when the page loads
    document.querySelector('.container').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.container').style.transition = 'opacity 0.5s ease-in';
        document.querySelector('.container').style.opacity = '1';
    }, 100);
}); 