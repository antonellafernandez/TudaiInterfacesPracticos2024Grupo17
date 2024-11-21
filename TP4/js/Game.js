document.addEventListener("DOMContentLoaded", function() {
    const closeAsideBtn = document.getElementById("closeAside");
    const showAsideBtn = document.getElementById("showAside");
    const aside = document.querySelector(".card");

    // Al hacer clic en "Cerrar", ocultar el aside y mostrar el botón "How to Play"
    closeAsideBtn.addEventListener("click", function() {
        aside.style.display = "none"; // Oculta el aside
        showAsideBtn.style.display = "block"; // Muestra el botón "How to Play"
    });

    // Al hacer clic en "How to Play", mostrar el aside y ocultar el botón
    showAsideBtn.addEventListener("click", function() {
        aside.style.display = "block"; // Muestra el aside
        showAsideBtn.style.display = "none"; // Oculta el botón "How to Play"
    });
});