import { GameEngine } from "./game.js";

// Dynamically import the scene based on URL parameter
const params = new URLSearchParams(window.location.search);
const sceneName = params.get("scene") || "none"; // default scene

async function loadScene() {
    try {
        // Import the scene module dynamically
        const module = await import(`../scenes/${sceneName}.js`);
        const createScene = module.default;

        const game = new GameEngine();
        const scene = createScene(game);

        game.registerScene(scene.name || "Interactive Scene", scene);

        const fullscreenButton = document.getElementById("fullscreenButton");

        const startExperience = async () => {
            try {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                }
                fullscreenButton.style.display = "none";
                game.initialize();
                game.transitionToScene(scene.name || "Interactive Scene");
            } catch (err) {
                console.error("Error attempting to enable fullscreen:", err);
                fullscreenButton.style.display = "none";
                game.initialize();
                game.transitionToScene(scene.name || "Interactive Scene");
            }
        };

        fullscreenButton.addEventListener("click", startExperience);

        // For non-mobile or if fullscreen isn't needed
        if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            fullscreenButton.style.display = "none";
            game.initialize();
            game.transitionToScene(scene.name || "Interactive Scene");
        }
    } catch (error) {
        console.error("Error loading scene:", error);
        document.body.innerHTML =
            '<h1 style="color:white;text-align:center;">Scene not found</h1>';
    }
}

loadScene();
