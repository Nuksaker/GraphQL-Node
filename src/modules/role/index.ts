import { productTypeDefs } from "./schema";
import { productResolvers } from "./resolvers";

export const productModule = {
  typeDefs: productTypeDefs,
  resolvers: productResolvers,
};
