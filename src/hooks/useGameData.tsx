import { Fates } from "@/components/enums/Fates";
import type { GameData } from "@robertguglielmino/arcs-types";
import { RESOURCES } from "@/components/enums/Resources";
import { TITLES } from "@/components/enums/Titles";
import pako from "pako";
import { useEffect, useState } from "react";
import { Color } from "@/components/enums/Colors";


const mockData: GameData = {
    playerData: {
        name: ["ROB", "MATT", "HUNTER", "DARRELL"],
        fate: [Fates.Steward, Fates.Admiral, Fates.Pathfinder, Fates.Conspirator],
        color: ["white", "blue", "red", "yellow"],
        power: [11, 2, 3, 411],
        objectiveProgress: [1, 21, 3, 4],
        resources: [
            [RESOURCES.Fuel, RESOURCES.Empty, RESOURCES.Fuel, RESOURCES.Empty, RESOURCES.Fuel, RESOURCES.Empty],
            [RESOURCES.Relic, RESOURCES.Material, RESOURCES.Weapons, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Psionics, RESOURCES.Psionics, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Relic, RESOURCES.Fuel, RESOURCES.Empty, RESOURCES.Relic, RESOURCES.Material],
        ],
        supply: { agents: [3, 3, 3, 3], ships: [4, 4, 4, 4], cities: [2, 4, 2, 2], starports: [5, 5, 5, 5], favors: [] },
        outrage: [[true, false, false, true, false], [false, true, true, true, false], [true, false, true, false, true], [false, false, false, false, true], [false, false, false, false, false]],
        courtCards: [
            ["f01_02", "f01_03", "f01_05", "f01_06", "f01_07"],
            ["f05_02", "f05_03", "f05_04"],
            ["f06_02", "f06_05", "f06_06", "f06_07", "f06_08", "f06_09", "f06_10", "f06_11", "f06_12", "f06_13", "f06_14", "f06_17", "f06_20", "f06_21", "f06_22", "f06_23", "f06_25"],
            []
        ],
        ambitionProgress: {
            tycoon: [0, 0, 0, 0, 0],
            tyrant: [0, 0, 0, 0, 0],
            warlord: [0, 0, 0, 0, 0],
            keeper: [0, 0, 0, 0, 0],
            empath: [0, 0, 0, 0, 0],
        },
        flagship: [
            ["city", "starport", "starport", "city", "city", "starport", "starport", "city", "city", "starport", "starport", "city"],
            ["city", "starport", "starport", "city", "city", "starport", "starport", "city", "city", "starport", "starport", "city"],
            ["city", "starport", "starport", "city", "city", "starport", "starport", "city", "city", "starport", "starport", "city"],
            ["city", "starport", "starport", "city", "city", "starport", "starport", "city", "city", "starport", "starport", "city"]
        ],
        titles: [
            [TITLES.FirstRegent, TITLES.LordCluster1],
            [TITLES.FirstRegent, TITLES.CommonwealthMember, TITLES.JudgesChosen],
            [TITLES.FirstRegent, TITLES.CommonwealthMember, TITLES.JudgesChosen],
            [TITLES.FirstRegent, TITLES.CommonwealthMember, TITLES.JudgesChosen]
        ]
    },
    gameData: {
        isCampaign: true,
        ambitionDeclarations: [],
        courtCards: [
            { id: "f01_05", agents: [{ color: Color.Red, value: 4 }] },
            { id: "f01_06", agents: [{ color: Color.Yellow, value: 3 }] },
            { id: "f01_07", agents: [{ color: Color.Blue, value: 2 }] },
            { id: "f01_08", agents: [{ color: Color.White, value: 1 }] }
        ],
        edicts: [],
        laws: [""]
    }
}

export const initialData: GameData = {
    playerData: {
        name: ["", "", "", ""],
        fate: [Fates.Steward, Fates.Steward, Fates.Steward, Fates.Steward],
        color: ["white", "blue", "red", "yellow"],
        power: [0, 0, 0, 0],
        objectiveProgress: [0, 0, 0, 0],
        resources: [
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
        ],
        supply: { agents: [3, 3, 3, 3], ships: [4, 4, 4, 4], cities: [2, 2, 2, 2], starports: [5, 5, 5, 5], favors: [] },
        outrage: [[false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false]],
        courtCards: [
            [],
            [],
            [],
            []
        ],
        ambitionProgress: {
            tycoon: [0, 0, 0, 0, 0],
            tyrant: [0, 0, 0, 0, 0],
            warlord: [0, 0, 0, 0, 0],
            keeper: [0, 0, 0, 0, 0],
            empath: [0, 0, 0, 0, 0]
        },
        flagship: [
        ],
        titles: [
            [],
            [],
            [],
            [],
        ]
    },
    gameData: {
        isCampaign: true,
        ambitionDeclarations: [[""]],
        courtCards: [],
        edicts: [],
        laws: [""]
    }
}

export function useGameData() {
    const [data, setData] = useState(mockData);


    useEffect(() => {
        window.Twitch.ext.listen(
            "broadcast",
            (_: string, contentType: string, message: string) => {
                if (contentType !== "application/json") {
                    console.debug(`Unexpected contentType "${contentType}"`);
                    return;
                }

                // Process the message with decompression if needed
                const processedData = handlePubSubMessage(message);
                if (processedData) {
                    // Validate data with zod before setting state
                    try {
                        // const validatedData = gameDataSchema.parse(processedData);
                        // Filter out null values from public1 and public2 arrays
                        setData(processedData);
                    } catch (error) {
                        console.error('Invalid data format:', error);
                    }
                }
            },
        );
    }, []);


    // Add the decompression function
    function handlePubSubMessage(message: string) {
        try {
            const parsedMessage = JSON.parse(message);

            // Check if the message is compressed
            if (parsedMessage.compressed) {
                const compressedData = parsedMessage.data;
                const binaryData = atob(compressedData);

                const charData = binaryData.split('').map(x => x.charCodeAt(0));
                const binData = new Uint8Array(charData);

                const decompressedData = pako.inflate(binData, { to: 'string' });

                return JSON.parse(decompressedData);
            } else {
                return parsedMessage;
            }
        } catch (error) {
            console.error('Error processing message:', error);
            return null;
        }
    }

    return data;
}