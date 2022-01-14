//@ts-ignore
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { useAuthStore } from "../stores/auth";
import { onError } from "@apollo/client/link/error";

const SERVER_URL = "https://showbe.damaral.my.id";

const uploadLink = createUploadLink({
    uri: SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { token } = useAuthStore.getState();
    // return the headers to the context so httpLink can read them

    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message }) => {
            if (message == "Unauthenticated.") {
                window.alert(
                    "Terdeteksi kesalahan autentikasi di akun anda mohon login ulang"
                );
            }
        });
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(uploadLink as unknown as ApolloLink),
    uri: SERVER_URL,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    ...[

                    ].reduce((o, key) => ({ ...o, [key]: relayStylePagination() }), {}),
                },
            },
        },
    }),
});
