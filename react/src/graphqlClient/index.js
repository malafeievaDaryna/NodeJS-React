import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost'
import Cookies from 'js-cookie';
import gql from 'graphql-tag'
import config from  "../config";

const authLink = new ApolloLink((operation, forward) => {
    const login = Cookies.get('token');
    if(login){
      operation.setContext({
        headers: {
          'authorization': 'Bearer ' + login
        }
      })
    }
    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([
      authLink,
      new HttpLink({uri: config.endpointGraphQL})
    ]),
    cache: new InMemoryCache()
});

    
export async function getProductById(id) {

    const query = gql`
    query GetProductById($id: ID)
    { 
        getProductById(id: $id){
            price, name, desc
            }
    }`;

    const {data: {getProductById}} = await client.query({query, variables: {id}});
    return getProductById;
}

export async function getAllProducts() {

    const query = gql`{
        getAllProducts { name, desc, price, id }
    }`;

    // request data without cache to avoid getting obslete data after mutation requests
    const {data: {getAllProducts}} = await client.query(
        {query, fetchPolicy: 'no-cache'});
    return getAllProducts;
}

export async function createProduct(name, description, price) {

    const mutation = gql`
    mutation CreateProduct($input: CreateProductInput){
       result: createProduct(input: $input) 
    }`;

    const {data: {result}} = await client.mutate({mutation, 
        variables: { 
            input : {
               name: name,
               desc: description,
               price: parseFloat(price)
            }
    }});

    return result;
}
