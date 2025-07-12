import { GameEngine } from "./game.js";

const params = new URLSearchParams(window.location.search);
const sceneName = params.get("scene") || "rps/rock-paper-scissors";

async function loadScene() {
    try {
        const defaultSceneName = "Game";
        const module = await import(`../scenes/${sceneName}.js`);
        const createScene = module.default;

        const game = new GameEngine();
        const scene = createScene(game);

        game.registerScene(scene.name || defaultSceneName, scene);

        const fullscreenButton = document.getElementById("fullscreenButton");

        const startExperience = async () => {
            try {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                }
                fullscreenButton.style.display = "none";
                game.initialize();
                game.transitionToScene(scene.name || defaultSceneName);
            } catch (err) {
                console.error("Error attempting to enable fullscreen:", err);
                fullscreenButton.style.display = "none";
                game.initialize();
                game.transitionToScene(scene.name || defaultSceneName);
            }
        };

        fullscreenButton.addEventListener("click", startExperience);

        // Always show the button first
        fullscreenButton.style.display = "block";
    } catch (error) {
        console.error("Error loading scene:", error);
        document.body.innerHTML =
            '<h1 style="color:white;text-align:center;">Scene not found</h1>';
    }
}

loadScene();
