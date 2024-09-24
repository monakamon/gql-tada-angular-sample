/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Attack': { kind: 'OBJECT'; name: 'Attack'; fields: { 'damage': { name: 'damage'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'type': { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Boolean': unknown;
    'Float': unknown;
    'ID': unknown;
    'Int': unknown;
    'Pokemon': { kind: 'OBJECT'; name: 'Pokemon'; fields: { 'attacks': { name: 'attacks'; type: { kind: 'OBJECT'; name: 'PokemonAttack'; ofType: null; } }; 'classification': { name: 'classification'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'evolutionRequirements': { name: 'evolutionRequirements'; type: { kind: 'OBJECT'; name: 'PokemonEvolutionRequirement'; ofType: null; } }; 'evolutions': { name: 'evolutions'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Pokemon'; ofType: null; }; } }; 'fleeRate': { name: 'fleeRate'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'height': { name: 'height'; type: { kind: 'OBJECT'; name: 'PokemonDimension'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'image': { name: 'image'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'maxCP': { name: 'maxCP'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'maxHP': { name: 'maxHP'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'number': { name: 'number'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'resistant': { name: 'resistant'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'types': { name: 'types'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'weaknesses': { name: 'weaknesses'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'weight': { name: 'weight'; type: { kind: 'OBJECT'; name: 'PokemonDimension'; ofType: null; } }; }; };
    'PokemonAttack': { kind: 'OBJECT'; name: 'PokemonAttack'; fields: { 'fast': { name: 'fast'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Attack'; ofType: null; }; } }; 'special': { name: 'special'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Attack'; ofType: null; }; } }; }; };
    'PokemonDimension': { kind: 'OBJECT'; name: 'PokemonDimension'; fields: { 'maximum': { name: 'maximum'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'minimum': { name: 'minimum'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'PokemonEvolutionRequirement': { kind: 'OBJECT'; name: 'PokemonEvolutionRequirement'; fields: { 'amount': { name: 'amount'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'pokemon': { name: 'pokemon'; type: { kind: 'OBJECT'; name: 'Pokemon'; ofType: null; } }; 'pokemons': { name: 'pokemons'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Pokemon'; ofType: null; }; } }; 'query': { name: 'query'; type: { kind: 'OBJECT'; name: 'Query'; ofType: null; } }; }; };
    'String': unknown;
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: never;
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}