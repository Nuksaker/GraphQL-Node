import { gql } from "apollo-server";

export const userTypeDefs = gql`
input UserInput {
  name: String!
  email: String!
}

type CreateUserResponse {
  _id: ID
  name: String
  email: String
  status: String
}

type User {
  _id: ID!
  name: String!
  email: String!
}

type Query {
    users(page: Int, limit: Int, sort: String): [User!]!
    user(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
  createUsers(users: [UserInput!]!): [CreateUserResponse!]!
  updateUser(id: ID!, name: String, email: String): User
  deleteUser(id: ID!): Boolean
}
`;
