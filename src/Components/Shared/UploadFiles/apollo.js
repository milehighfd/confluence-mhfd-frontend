import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { SERVER } from "../../../Config/Server.config";

const link = createUploadLink({ uri: SERVER.GRAPHQL})

export const client = new ApolloClient({
   link,
   cache: new InMemoryCache()
});