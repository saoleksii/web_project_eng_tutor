import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import {
   CombinedGraphQLErrors,
   CombinedProtocolErrors,
 } from "@apollo/client/errors"

const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql'
})

const errorLink = new ErrorLink(({ error, operation }) => {
   if (CombinedGraphQLErrors.is(error)) {
     error.errors.forEach(({ message, locations, path, extensions }) => {
        console.log(
         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
       )
       if (extensions?.code === "UNAUTHENTICATED") {
         localStorage.clear()
         window.location.href = '/login'
        }
     })
   } else if (CombinedProtocolErrors.is(error)) {
     error.errors.forEach(({ message, extensions }) => {
        console.log(
         `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
           extensions
         )}`
       )
     })
   } else {
     console.error(`[Network error]: ${error}`)
   }
 })

const authLink = new SetContextLink((request, prevContext) => ({
    headers: {
        ...prevContext.headers,
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
}))

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
})

export default client