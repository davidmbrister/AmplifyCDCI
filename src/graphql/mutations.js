/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCamp = /* GraphQL */ `
  mutation CreateCamp(
    $input: CreateCampInput!
    $condition: ModelCampConditionInput
  ) {
    createCamp(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCamp = /* GraphQL */ `
  mutation UpdateCamp(
    $input: UpdateCampInput!
    $condition: ModelCampConditionInput
  ) {
    updateCamp(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCamp = /* GraphQL */ `
  mutation DeleteCamp(
    $input: DeleteCampInput!
    $condition: ModelCampConditionInput
  ) {
    deleteCamp(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
