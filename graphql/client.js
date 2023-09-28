import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';




export const client = new ApolloClient({
    uri: 'https://dai-indsutry-strapi-main.azurewebsites.net//graphql',
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: 'https://dai-indsutry-strapi-main.azurewebsites.net//graphql', // Apollo Server is served from port 4000
        headers: {
          "keep-alive": "true"
        }
      })
});
