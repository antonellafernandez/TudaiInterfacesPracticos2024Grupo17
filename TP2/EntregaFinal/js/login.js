
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


const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();

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


const validateInputs = () => {

  const emailValue = email.value.trim(); 
  const passwordValue = password.value.trim();

  if (emailValue === '') {
    setError(email, 'Email is required');
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'Password is required');
    isValid = false;
  } else {
    setSuccess(password);
  }

}
