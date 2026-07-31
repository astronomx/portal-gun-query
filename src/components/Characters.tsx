"use client"

import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

type TCharacter = {
    __typename?: "Character";
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
};

type GetCharactersQuery = {
    characters: {
        __typename?: "Characters";
        results: TCharacter[];
    } | null;
};

type GetCharactersQueryVariables = Record<string, never>;

const GET_CHARACTERS: TypedDocumentNode<
    GetCharactersQuery,
    GetCharactersQueryVariables
> = gql`
    query GetCharacters {
        characters(page: 1) {
            results {
                id
                name
                image
                status
                species
            }
        }
    }
`;

export default function Characters() {
    const { loading, error, data } = useQuery(GET_CHARACTERS)
    const [page, setPage] = useState<number>(1);

    if (loading) return <div>Loading characters</div>
    if (error) return <div>Error: cannot load characters</div>
    if (!data?.characters?.results) return <div>No characters found</div>

    return (
        <div>
            {
                data.characters.results.map((character) => (
                    <div className="" key={character.id}>
                        <p>{character.name}</p>
                    </div>
                ))
            }
        </div>
    )
}
