import type { IGraphQLConfig } from 'graphql-config';

const config = {
  schema: './pokemon.graphql',
  include: [
    './**/*.graphql',
    './src/**/*.ts',
  ],
  extensions: {
    projects: {
      'graphql-pokemon2': {
        url: 'https://graphql-pokemon2.vercel.app',
        introspect: true,
      },
    }
  },
} satisfies IGraphQLConfig;

export default config;

