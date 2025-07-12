import { config } from "./config.js";

export const getAssetPathForScene = (filename) => {
    return `${config.assetsBasePathForScene}${filename}`;
};

export const getAssetPathForGameHub = (filename) => {
    return `${config.assetsBasePathForGameHub}${filename}`;
};
