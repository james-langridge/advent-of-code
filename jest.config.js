module.exports = {
    transform: {
        "^.+\\.ts?$": "babel-jest",
    },
    testEnvironment: "node",
    preset: "ts-jest",
    testMatch: ["<rootDir>/**/*.ts"],
};