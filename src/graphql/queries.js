/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCamp = /* GraphQL */ `
  query GetCamp($id: ID!) {
    getCamp(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listCamps = /* GraphQL */ `
  query ListCamps(
    $filter: ModelCampFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCamps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
