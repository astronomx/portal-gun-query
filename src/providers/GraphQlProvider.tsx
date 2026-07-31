"use client"

import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apollo-client";

interface IGraphQlProviderProps {
    children: React.ReactNode,
}

export default function GraphQlProvider({ children }: IGraphQlProviderProps) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}