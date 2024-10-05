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
  