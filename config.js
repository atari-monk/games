const development = {
    assetsBasePathForScene: "../assets/",
    assetsBasePathForGameHub: "/assets/",
};

const production = {
    assetsBasePathForScene: "/games/assets/",
    assetsBasePathForGameHub: "/games/assets/",
};

const isDevelopment = false;

export const config = isDevelopment ? development : production;
