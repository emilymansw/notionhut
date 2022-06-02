import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { onError } from '@apollo/link-error';
import withApollo from 'next-with-apollo';

function createClient({ initialState }) {
  return new ApolloClient({
    
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }

        if (networkError) {
          console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
        }
      }),
      new HttpLink({
        uri: process.env.BACKEND_URL
      })
    ]),
    
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              tools:{
                keyArgs: ['where'],
                merge(existing=[], incoming, {args}) {
                    return [...existing, ...incoming];
                },              
              },
              templates:{
                keyArgs: false,
                merge(existing=[], incoming) {
                    return [...existing, ...incoming];
                },              
              },
            },
          },
        },
      }
      ).restore(initialState || {}),
    
  });
}

export default withApollo(createClient, { getDataFromTree });