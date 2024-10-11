const form = document.querySelector('form');
const namee = document.getElementById('name');
const lastname = document.getElementById('username');
const birthday = document.getElementById('birthday');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const recaptchaCheckbox = document.querySelector('#recaptcha-checkbox');

const popover = document.querySelector('#id_popover');

form.addEventListener('submit', e => {
  e.preventDefault();

  if (validateInputs()) {
    popover.showPopover(); // Mostrar el popover solo si la validación es exitosa
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  let isValid = true;  // Variable que indica si el formulario es válido

  const nameValue = namee.value.trim();
  const lastnameValue = lastname.value.trim();
  const birthdayValue = birthday.value.trim();
  const emailValue = email.value.trim(); 
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const recaptchaCheckboxValue = recaptchaCheckbox.checked; 

  if (nameValue === '') {
    setError(namee, 'Name is required');
    isValid = false;
  } else {
    setSuccess(namee);
  }

  if (lastnameValue === '') {
    setError(lastname, 'Lastname is required');
    isValid = false;
  } else {
    setSuccess(lastname);
  }

  if (birthdayValue === '') {
    setError(birthday, 'Birthday is required');
    isValid = false;
  } else {
    setSuccess(birthday);
  }

  if (emailValue === '') {
    setError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address, like you@example.com');
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'Password is required');
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === '') {
    setError(confirmPassword, 'Confirm Password is required');
    isValid = false;
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, 'Passwords do not match');
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  if (!recaptchaCheckboxValue) {
    const errorDisplay = document.querySelector('.g-recaptcha .error');
    errorDisplay.innerText = 'Please confirm you are not a robot';
    isValid = false;
  } else {
    const errorDisplay = document.querySelector('.g-recaptcha .error');
    errorDisplay.innerText = '';
  }

  return isValid;  // Retornar si el formulario es válido o no
};








document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', function () {
      // Encuentra el input relacionado con el botón
      const passwordInput = button.previousElementSibling; 
      
      // Busca los íconos de mostrar/ocultar en el botón
      const showPasswordIcon = button.querySelector('.show-password');
      const hidePasswordIcon = button.querySelector('.hide-password');
      
      // Alterna entre password y text para mostrar u ocultar la contraseña
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordIcon.style.display = 'none';
        hidePasswordIcon.style.display = 'inline';
      } else {
        passwordInput.type = 'password';
        showPasswordIcon.style.display = 'inline';
        hidePasswordIcon.style.display = 'none';
      }
    });
  });
  