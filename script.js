document.addEventListener("DOMContentLoaded", () => {
    // Sélectionner toutes les sections
    const sections = document.querySelectorAll(".section");
    const images = document.querySelectorAll("img"); // Sélectionner toutes les images pour les animer aussi

    // Options pour l'observateur d'intersection des sections
    const sectionOptions = {
        threshold: 0.2, // La section doit être à 20% visible pour déclencher l'animation
    };

    // Observer d'intersection pour l'animation d'apparition des sections
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Désactiver l'observation une fois l'élément visible
            }
        });
    }, sectionOptions);

    // Observer chaque section pour l'animation d'apparition
    sections.forEach(section => {
        section.classList.add("hidden");
        sectionObserver.observe(section);
    });

    // Observer d'intersection pour les images
    const imageOptions = {
        threshold: 0.2, // Les images doivent être à 20% visibles pour apparaître
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Ajouter une classe pour l'animation
                observer.unobserve(entry.target);
            }
        });
    }, imageOptions);

    // Observer chaque image pour l'animation d'apparition
    images.forEach(image => {
        image.classList.add("hidden");
        imageObserver.observe(image);
    });

    // Ajout d'une animation de défilement fluide pour la navigation
    document.querySelector("nav").addEventListener("click", (event) => {
        if (event.target.tagName === "A" && event.target.getAttribute("href").startsWith("#")) {
            event.preventDefault();
            const targetId = event.target.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Ajuster pour prendre en compte l'entête
                    behavior: "smooth",
                });
            }
        }
    });

    // Ajout d'une classe pour améliorer l'animation de transition
    const style = document.createElement("style");
    style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
