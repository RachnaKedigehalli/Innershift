module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            assets: "./assets",
          },
        },
      ],
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      "react-native-reanimated/plugin",
      "macros",
    ],
  };
};
