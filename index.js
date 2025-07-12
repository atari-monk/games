document.addEventListener("DOMContentLoaded", () => {
    // Button animations (unchanged)
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.9)";
            button.style.boxShadow = "inset 0 0 10px rgba(0,0,0,0.5)";
        });

        button.addEventListener("mouseup", () => {
            button.style.transform = "";
            button.style.boxShadow = "";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
            button.style.boxShadow = "";
        });
    });

    // Game card interactions - UPDATED VERSION
    const gameCards = document.querySelectorAll(".game-card[href]");
    gameCards.forEach((card) => {
        card.addEventListener("click", async (e) => {
            e.preventDefault();
            const href = card.getAttribute("href");
            const target = card.getAttribute("target");

            try {
                const audio = new Audio("assets/audio/arcade-button.mp3");
                audio.volume = 0.3; // Lower volume for better UX
                const soundPlayed = audio.play();

                // Wait either for sound to play or minimum 300ms
                await Promise.race([
                    soundPlayed,
                    new Promise((resolve) => setTimeout(resolve, 300)),
                ]);

                // Handle navigation based on target attribute
                if (target === "_blank") {
                    window.open(href, "_blank");
                } else {
                    window.location.href = href;
                }
            } catch (err) {
                console.warn("Audio error:", err);
                // Fallback navigation if audio fails
                if (target === "_blank") {
                    window.open(href, "_blank");
                } else {
                    window.location.href = href;
                }
            }
        });
    });
});
