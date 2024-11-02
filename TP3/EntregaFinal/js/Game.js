document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("closeAside").addEventListener("click", function() {
        const aside = document.querySelector(".card");
        aside.style.display = "none"; // Oculta el aside
    });
});