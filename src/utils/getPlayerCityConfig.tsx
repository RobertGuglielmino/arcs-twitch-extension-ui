import type { Color } from "@robertguglielmino/arcs-types";
import { getColorImages } from "./getColorImages";

export function getPlayerCityConfig(color: Color, imgSrc: (s: string) => string) {
    return {
        positions: [
            { top: 22.5, left: 91 },
            { top: 22.5, left: 79.4 },
            { top: 22.5, left: 61.9 },
            { top: 22.5, left: 44.5 },
            { top: 22.5, left: 33 }
        ],
        size: { width: 9 },
        image: getColorImages(color, imgSrc)
    };
}