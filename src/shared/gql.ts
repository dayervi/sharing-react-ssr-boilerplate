import fetch from "isomorphic-fetch";
import {ApolloClient, ApolloClientOptions, createHttpLink, HttpLink, InMemoryCache} from "@apollo/client";

export const APOLLO_CACHE_SCRIPT_ID = "apollo-state";

const buildApolloClient = (ssrMode: boolean = false, restoringCache?: any) => {
  const cache = new InMemoryCache();
  if (!!restoringCache) cache.restore(JSON.parse(restoringCache));

  return new ApolloClient({
    ssrMode,
    link: ssrMode
      ? createHttpLink({ uri: process.env.GQL_CLIENT_URL, fetch })
      : new HttpLink({ uri: process.env.GQL_CLIENT_URL }),
    cache
  } as unknown as ApolloClientOptions<InMemoryCache>);
}

export default buildApolloClient;
