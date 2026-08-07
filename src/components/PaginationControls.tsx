"use client"
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Dispatch, SetStateAction } from "react";


import style from "@/styles/paginationControl.module.css";

type PaginationControlProps = {
    current: string,
    setCurrent: Dispatch<SetStateAction<string>>
}

// Type for pages information
type TPageInformation = {
    next: number | null,
    prev: number | null
}

type GetPageInformationQuery = {
    characters: {
        __typename: "Page",
        info: TPageInformation
    } | null
}

type GetPageInformationQueryVariables = Record<string, never>

// Query the page information
export const GET_PAGEINFORMATION: TypedDocumentNode<
    GetPageInformationQuery,
    GetPageInformationQueryVariables
> = gql`
    query Page {
        characters {
            info {
                next
                prev
            }
        }
    }
`

export default function PaginationControls({ current, setCurrent }: PaginationControlProps) {
    const { loading, error, data } = useQuery(GET_PAGEINFORMATION);

    if (error) return <div className={style.container}>Error: cannot load pages</div>
    if(!data?.characters?.info) return <div className={style.container}>There are no pages</div>

    console.log(data.characters.info.next);

    return (
        <div>
            <div className={style.container}>
                {/* Here will the value of 'prev' */}
                <button
                    disabled={data.characters?.info.prev == null}
                    onClick={() => {
                        const prev = data.characters?.info.prev
                        if (prev != null) setCurrent(String(prev))
                    }}
                >
                    Previous
                </button>

                {/* Here will be the value of the current page */}
                <p>{ current }</p>

                {/* Here will be the value of 'next' */}
                <button
                    disabled={data.characters?.info.next == null}
                    onClick={() => {
                        const next = data.characters?.info.next
                        if (next != null) setCurrent(String(next))
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}