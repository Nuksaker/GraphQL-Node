import { userTypeDefs } from "./modules/user/schema";
import { userResolvers } from "./modules/user/resolvers";
import { roleTypeDefs } from "./modules/role/schema";
import { roleResolvers } from "./modules/role/resolvers";

export const typeDefs = [userTypeDefs, roleTypeDefs];
export const resolvers = [userResolvers, roleResolvers];

