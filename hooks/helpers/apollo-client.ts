import {
    ApolloClient,
    ApolloLink,
    DefaultOptions,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client/core"
import { onError } from "@apollo/client/link/error"
import fetch from "cross-fetch"
import { getToken } from "next-auth/jwt"

const LENS_API = "https://api-mumbai.lens.dev/"

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
}

const httpLink = new HttpLink({
    uri: LENS_API,
    fetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )

    if (networkError) console.log(`[Network error]: ${networkError}`)
})

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
    fetch("/api/token")
        .then((res) => {
            res.json().then((result) => {
                const token = result.token
                console.log("jwt token:", token)

                // Use the setContext method to set the HTTP headers.
                operation.setContext({
                    headers: {
                        "x-access-token": token ? `Bearer ${token}` : "",
                    },
                })
                console.log("456")

                // Call the next link in the middleware chain.
                return forward(operation)
            })
            console.log("46")
            return null
        })
        .catch((err) => {
            console.log("123")
            console.log(err)
        })
        .catch((err) => {
            console.log("1234")
            console.log(err)
        })
    console.log("1236")

    return null
})

export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
})
