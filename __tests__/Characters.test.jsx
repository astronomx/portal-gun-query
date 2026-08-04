import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { GET_CHARACTERS } from "@/components/Characters"

import Characters from "@/components/Characters";

const mocks = [
    {
        // Prevents React from batching away the loading state
        delay: 10,
        request: {
            // Make sure queries you want to use are exported
            query: GET_CHARACTERS,
        },
        result: {
            // Each mock object defines a request field 
            // (indicating the shape and variables of the operation to match against)
            // and a result field
            data: {
                characters: {
                    results: [
                        {
                          __typename: "Character",
                          id: "1",
                          name: "Rick Sanchez",
                          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                          status: "Alive",
                          species: "Human",
                        },
                    ]
                }
            }
        }
    }
];

// ARRANGE
// Start a new test with the `it()` method
it("should render characters", async () => {
    // ACT
    render(
        // The mocks prop of MockedProvider is an array of objects, each of which 
        // defines the mock response for a single operation
        <MockedProvider mocks={mocks}>
            <Characters />
        </MockedProvider>
    );

    // ASSERT
    // Testing if the loading state is working correctly
    expect(await screen.findByAltText("Spinning portal")).toBeInTheDocument();

    // Testing if character get's loaded properly
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(await screen.findByAltText("Image of Rick Sanchez")).toBeInTheDocument();
    expect(await screen.findByText("Alive")).toBeInTheDocument();
    expect(await screen.findByText("Human")).toBeInTheDocument();
})