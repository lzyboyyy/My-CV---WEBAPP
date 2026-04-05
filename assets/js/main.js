const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

const rangeInput = document.querySelector('#designRange');
const rangeOutput = document.querySelector('#rangeOutput');

if (rangeInput && rangeOutput) {
  rangeOutput.textContent = rangeInput.value;
  rangeInput.addEventListener('input', () => {
    rangeOutput.textContent = rangeInput.value;
  });
}

const form = document.querySelector('#contact-form');

if (form) {
  const fields = form.querySelectorAll('input[required], select[required], textarea[required]');

  const messages = {
    fullName: 'Please enter your full name.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter exactly 10 digits.',
    password: 'Password must have at least 6 characters.',
    age: 'Please choose an age from 16 to 60.',
    visitDate: 'Please choose a preferred date.',
    purpose: 'Please select one purpose.',
    message: 'Message must be at least 10 characters.'
  };

  function showError(field, message) {
    const error = field.parentElement.querySelector('.error-message');
    if (error) {
      error.textContent = message;
    }
  }

  function clearError(field) {
    const error = field.parentElement.querySelector('.error-message');
    if (error) {
      error.textContent = '';
    }
  }

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      clearError(field);
      field.setCustomValidity('');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      clearError(field);

      if (!field.checkValidity()) {
        isValid = false;
        showError(field, messages[field.id] || 'Please fill in this field correctly.');
      }
    });

    const radioGroup = form.querySelectorAll('input[name="contactMethod"]');
    const radioChecked = Array.from(radioGroup).some((radio) => radio.checked);
    const radioError = form.querySelector('.radio-error');

    if (!radioChecked) {
      isValid = false;
      if (radioError) {
        radioError.textContent = 'Please choose one contact method.';
      }
    } else if (radioError) {
      radioError.textContent = '';
    }

    const status = document.querySelector('#form-status');

    if (isValid) {
      if (status) {
        status.textContent = 'Form submitted successfully. This is a demo submission.';
      }
      form.reset();
      if (rangeOutput) {
        rangeOutput.textContent = '7';
      }
    } else if (status) {
      status.textContent = 'Please fix the highlighted errors before submitting.';
    }
  });

  form.addEventListener('reset', () => {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach((error) => {
      error.textContent = '';
    });
    const status = document.querySelector('#form-status');
    if (status) {
      status.textContent = '';
    }
    const radioError = form.querySelector('.radio-error');
    if (radioError) {
      radioError.textContent = '';
    }
  });
}
