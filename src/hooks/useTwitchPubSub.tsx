import { useEffect, useState } from "react";
import { gameDataSchema } from "@/utils/validation";
import type { GameData } from "@robertguglielmino/arcs-types";
import pako from "pako";

export function useTwitchPubSub(initialData: any): GameData {
    const [data, setData] = useState(initialData);

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
                        const validatedData = gameDataSchema.parse(processedData);
                        // Filter out null values from public1 and public2 arrays
                        setData(validatedData);
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