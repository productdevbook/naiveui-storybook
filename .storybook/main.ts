const { resolve, relative } = require("path");
const Components = require("unplugin-vue-components/vite");
const AutoImport = require("unplugin-auto-import/vite");
const { loadConfigFromFile, mergeConfig } = require("vite");
const { HeadlessUiResolver, NaiveUiResolver } = require("unplugin-vue-components/resolvers");
const Unocss = require("unocss/vite").default;
const presetIcons = require("@unocss/preset-icons").default;
var fs = require("fs");

module.exports = {
  framework: "@storybook/vue3",
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/oku-ui/**/*.stories.@(js|jsx|ts|tsx|mdx|vue)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-a11y",
  ],
  core: {
    builder: "@storybook/builder-vite",
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    previewMdx2: true,
  },
  async viteFinal(config, { configType }) {
    config.plugins = config.plugins ?? [];
    config.plugins.push(
      Components({
        directoryAsNamespace: true,
        resolvers: [
          HeadlessUiResolver(),
          NaiveUiResolver(),
          (ionic) => {
            if (ionic.startsWith('Ion'))
              return {name: `Ion${ionic.slice(3)}`, from: '@ionic/vue'}
          },
          (oku) => {
            if (oku.startsWith('Oku'))
              return {name: `Oku${oku.slice(3)}`, from: '@oku/ui'}
          },
        ],
      })
    );
    config.plugins.push(
      AutoImport({
        directoryAsNamespace: true,
        resolvers: [HeadlessUiResolver(), NaiveUiResolver()],
      })
    );
    config.plugins.push(
      Unocss({
        presets: [
          presetIcons({
            scale: 1.2,
            extraProperties: {
              display: "inline-block",
            },
            prefix: 'i-',
          }),
        ],
      })
    );
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = ["graphql"];
    return {
      ...config,
      resolve: {
        alias: {
          ...config.resolve.alias,
          "~": `${resolve(__dirname, "..")}/src`,
          "~/*": `${resolve(__dirname, "..")}/src/*`,
          "~~": `${resolve(__dirname, "..")}`,
          "@sb": `${resolve(__dirname, "..")}/`,
          vue: "vue/dist/vue.esm-bundler.js",
        },
      },
    };
  },
};
