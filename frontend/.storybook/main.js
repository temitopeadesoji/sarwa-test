const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.@(mdx|ts|tsx)',
    '../stories/**/*.stories.@(mdx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        '@/utils': path.resolve(__dirname, '../src/utils/'),
        '@/atoms': path.resolve(__dirname, '../src/components/atoms/'),
        '@/molecules': path.resolve(__dirname, '../src/components/molecules/'),
        '@/organisms': path.resolve(__dirname, '../src/components/organisms/'),
      },
    },
  }),
};
