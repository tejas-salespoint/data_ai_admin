import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';




export const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: 'http://localhost:1337/graphql', // Apollo Server is served from port 4000
        headers: {
          "keep-alive": "true"
        }
      })
});
