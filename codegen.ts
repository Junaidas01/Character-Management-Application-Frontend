import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema.graphql',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: '../lib/gql-fetcher#gqlFetcher',
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        addSuspenseQuery: false,
      },
    },
  },
};

export default config;
