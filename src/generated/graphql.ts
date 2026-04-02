import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { gqlFetcher } from '../lib/gql-fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  description: Scalars['String']['output'];
  gender: CharacterGender;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: CharacterStatus;
};

export type CharacterFilterInput = {
  gender?: InputMaybe<CharacterGender>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CharacterStatus>;
};

export enum CharacterGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export enum CharacterStatus {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  Unknown = 'UNKNOWN'
}

export type Query = {
  __typename?: 'Query';
  characters: Array<Character>;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
};

export type CharactersQueryVariables = Exact<{
  filter?: InputMaybe<CharacterFilterInput>;
}>;


export type CharactersQuery = { __typename?: 'Query', characters: Array<{ __typename?: 'Character', id: string, image: string, name: string, status: CharacterStatus, gender: CharacterGender, description: string }> };



export const CharactersDocument = `

    query Characters($filter: CharacterFilterInput) {
  characters(filter: $filter) {
    id
    image
    name
    status
    gender
    description
  }
}
    
`;

export const useCharactersQuery = <
      TData = CharactersQuery,
      TError = unknown
    >(
      variables?: CharactersQueryVariables,
      options?: Omit<UseQueryOptions<CharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Characters'] : ['Characters', variables],
    queryFn: gqlFetcher<CharactersQuery, CharactersQueryVariables>(CharactersDocument, variables),
    ...options
  }
    )};

useCharactersQuery.getKey = (variables?: CharactersQueryVariables) => variables === undefined ? ['Characters'] : ['Characters', variables];
