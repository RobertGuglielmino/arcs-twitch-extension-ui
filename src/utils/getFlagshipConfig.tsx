import type { Color } from "@robertguglielmino/arcs-types";
import { getColorImages } from "./getColorImages";

export function getFlagshipConfig(color: Color, imgSrc: (s: string) => string) {
    return {
        positions: [
            { top: 45, left: 7.5 },
            { top: 17, left: 7.5 },
            { top: 45, left: 21 },
            { top: 17, left: 21 },
            { top: 45, left: 34.5 },
            { top: 17, left: 34.5 },
            { top: 45, left: 65.5 },
            { top: 17, left: 65.5 },
            { top: 45, left: 79 },
            { top: 17, left: 79 },
            { top: 45, left: 92.5 },
            { top: 17, left: 92.5 },
        ],
        size: { width: 9 },
        images: getColorImages(color, imgSrc)
    };
}