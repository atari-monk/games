document.addEventListener("DOMContentLoaded", () => {
    // Button animations
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

    // Game card interactions (only if sound is available)
    const gameCards = document.querySelectorAll(".game-card[href]");

    if (gameCards.length > 0) {
        gameCards.forEach((card) => {
            card.addEventListener("click", (e) => {
                // Remove this if you don't want sound effects
                try {
                    const audio = new Audio("./assets/audio/arcade-button.mp3");
                    audio.play().catch((e) => console.log("Sound error:", e));
                    // Don't wait for sound to finish
                    setTimeout(() => {
                        window.location.href = card.getAttribute("href");
                    }, 100); // Short delay for feedback
                } catch (err) {
                    console.log("Audio error:", err);
                    window.location.href = card.getAttribute("href");
                }
            });
        });
    }
});
