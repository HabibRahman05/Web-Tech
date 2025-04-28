    document.getElementById('registrationForm').addEventListener('submit', function(event) {
      event.preventDefault();
      clearErrors();
      
      let isValid = true;
      
      // Full Name validation (no spaces)
      const fullname = document.getElementById('fullname').value.trim();
      if (fullname === '') {
        showError('fullnameError', 'Full name is required');
        isValid = false;
      } else if (fullname.includes(' ')) {
        showError('fullnameError', 'Full name should not contain spaces');
        isValid = false;
      }
      
      // Email validation
      const email = document.getElementById('email').value.trim();
      if (email === '') {
        showError('emailError', 'Email is required');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
      }
      
      // Password validation
      const password = document.getElementById('password').value;
      if (password === '') {
        showError('passwordError', 'Password is required');
        isValid = false;
      } else if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        isValid = false;
      }
      
      // Confirm Password validation
      const confirmPassword = document.getElementById('confirm-password').value;
      if (confirmPassword === '') {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
      } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
      }
      
      // Date of Birth validation (must be 18+)
      const dob = document.getElementById('dob').value;
      if (dob === '') {
        showError('dobError', 'Date of birth is required');
        isValid = false;
      } else {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          showError('dobError', 'You must be at least 18 years old');
          isValid = false;
        }
      }
      
      // Country validation
      const country = document.getElementById('country').value;
      if (country === '') {
        showError('countryError', 'Please select a country');
        isValid = false;
      }
      
      // Gender validation
      const gender = document.querySelector('input[name="gender"]:checked');
      if (!gender) {
        showError('genderError', 'Please select a gender');
        isValid = false;
      }
      
      // Terms validation
      const terms = document.getElementById('terms').checked;
      if (!terms) {
        showError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
      }
      
      if (isValid) {
        alert('Form submitted successfully!');
        // this.submit(); // Uncomment this line to actually submit the form
      }
    });
    
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
    }
    
    function clearErrors() {
      const errorElements = document.querySelectorAll('.error');
      errorElements.forEach(element => {
        element.textContent = '';
      });
    }
    
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }