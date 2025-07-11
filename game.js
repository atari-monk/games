export class GameEngine {
    #canvas = document.getElementById("gameCanvas");
    #ctx = this.#canvas.getContext("2d");
    #currentScene = null;
    #scenes = new Map();
    #lastTimestamp = 0;

    constructor() {}

    #handleWindowResize = () => {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
        this.#currentScene?.resize?.();
    };

    #runGameLoop = (timestamp) => {
        const deltaTime = (timestamp - this.#lastTimestamp) / 1000;
        this.#lastTimestamp = timestamp;

        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#currentScene?.update?.(deltaTime);

        this.#currentScene?.render?.(this.#ctx);
        requestAnimationFrame(this.#runGameLoop);
    };

    initialize() {
        this.#handleWindowResize();
        window.addEventListener("resize", this.#handleWindowResize);
        requestAnimationFrame((timestamp) => {
            this.#lastTimestamp = timestamp;
            this.#runGameLoop(timestamp);
        });
    }

    registerScene(name, sceneModule) {
        this.#scenes.set(name, sceneModule);
        sceneModule.init?.();
    }

    transitionToScene(name) {
        const scene = this.#scenes.get(name);
        if (!scene) return false;

        this.#currentScene?.onExit?.();
        this.#currentScene = scene;
        this.#currentScene.onEnter?.();
        return true;
    }

    get canvas() {
        return this.#canvas;
    }

    get renderingContext() {
        return this.#ctx;
    }
}
