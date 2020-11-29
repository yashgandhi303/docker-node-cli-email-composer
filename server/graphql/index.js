import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

import resolvers from "./subscriptions/index";

// Load schema from the graphql files
const schema = loadSchemaSync(join(__dirname, "../**/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema: schemaWithResolvers,
  introspection: true,
  validationRules: [depthLimit(7)],

  formatError: (err) => {
    if (err.message.startsWith("Database Error:::::::::: ")) {
      return new Error("Internal server error:::::::::::");
    }
    console.error(`ERROR::::::::::${err}`);
    return err;
  },
});

export default apolloServer;
