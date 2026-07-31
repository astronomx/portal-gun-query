"use client"

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

const GET_CHARACTERS = gql`
    query GetCharacters {
        characters(page: 1) {
            results {
                name,
                image,
                status,
                species
            }
        }
    }
`;

type TCharacters = {
    id: number,
    name: string,
    image: string,
    status: string,
    species: string
}


export default function Characters() {
    const { loading, error, data } = useQuery(GET_CHARACTERS)
    const [page, setPage] = useState<number>(1);

    console.log(data);
    const character: TCharacters = data;

    if (loading) return <div>Loading characters</div>
    if (error) return <div>Error: cannot find characters</div>

    return (
        <div>
            <p>{character.name}</p>
        </div>
    )
}