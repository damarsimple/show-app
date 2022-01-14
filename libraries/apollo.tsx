//@ts-ignore
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { useAuthStore } from "../stores/auth";
import { onError } from "@apollo/client/link/error";

const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { token } = useAuthStore.getState();
    // return the headers to the context so httpLink can read them

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
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
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    ...[
                        "transactions",
                        "courses",
                        "quizzes",
                        "tutorings",
                        "submissions",
                        "classtypes",
                        "vouchers",
                        "questions",
                        "extracurriculars",
                        "provinces",
                        "quizplays",
                        "formsubmissions",
                        "withdraws",
                        "attendances",
                        "quizsessions",
                        "packagequestions",
                        "accesses",
                        "users",
                        "exams",
                        "cities",
                        "majors",
                        "password",
                        "examtypes",
                        "agendas",
                        "subjects",
                        "chatrooms",
                        "districts",
                        "reports",
                        "assigmentsubmissions",
                        "schools",
                        "documents",
                        "classrooms",
                        "notifications",
                        "announcements",
                        "meetings",
                        "chats",
                    ].reduce((o, key) => ({ ...o, [key]: relayStylePagination() }), {}),
                },
            },
        },
    }),
});