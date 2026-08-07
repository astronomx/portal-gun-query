"use client"

import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import Image from "next/image";
import style from "@/styles/characters.module.css"
import NotFound from "./NotFound";

type CharacterPageProps = {
    current: string
}

// Type for individual characters
type TCharacter = {
    // The __typename field returns the object type's name as a String
    // GraphQL clients use an object's __typename for many purposes, such as 
    // to determine which type was returned by a field that can return multiple types
    __typename?: "Character";
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
};

// Type for all characters and putting them in an array
type GetCharactersQuery = {
    characters: {
        __typename?: "Characters";
        results: TCharacter[];
    } | null;
};

type GetCharactersQueryVariables = {
    page: string
};

// GraphQl querying the characterlist
// Make sure the query follows structure of the body you're requesting
// GraphQl is about selecting specific fields on objects
export const GET_CHARACTERS: TypedDocumentNode<
    GetCharactersQuery,
    GetCharactersQueryVariables
> = gql`
    query GetCharacters($page: Int) {
        characters(page: $page) {
            info { 
                next 
                prev
            }
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

export default function Characters({ current }: CharacterPageProps) {
    const { loading, error, data } = useQuery(GET_CHARACTERS, { variables: { page: current } })

    if (loading) return <Image 
        src={"/images/spinning-portal.gif"} 
        height={150} 
        width={150}
        alt="Spinning portal"
        loading="eager"
        unoptimized
    />

    if (error) return <div>Error: cannot load characters</div>
    if (!data?.characters?.results) return <NotFound />

    return (
        <div className={style.container}>
            {
                data.characters.results.map((character) => (
                    <div className={style.card} key={character.id}>
                        <Image
                            src={character.image}
                            alt={`Image of ${character.name}`}
                            height={250} 
                            width={220} 
                            className={style.image}
                            loading="eager"
                        />

                        <div className={style.cardContent}>
                            <p className={style.characterName}>{character.name}</p>

                            <div className={style.cardContentInfo}>
                                <p className={style.characterSpecies}>{character.species}</p>
                                -
                                <p className={character.status == "Dead" ? style.characterDead :
                                    character.status == "Alive" ? style.characterAlive :
                                    character.status == "unknown" ? style.character : ""
                                }>{character.status}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
