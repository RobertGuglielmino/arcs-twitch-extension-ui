import flagshipBoard from "/src/assets/campaign/flagship-board.webp"
import { GAME_IMAGES } from "@/assets/game";
import { Color } from "@/components/enums/Colors";
import { PositionedImages } from "@/components/generic/PositionedImages";
import { useState } from "react";

interface FlagshipBoardDisplayProps {
    color: Color
}

export default function FlagshipBoardDisplay({ color }: FlagshipBoardDisplayProps) {
    const [flagshipInput, _] = useState<FlagshipInput>(['city', 'starport', 'starport', 'city', 'city', 'starport', 'starport', 'city', 'city', 'starport', 'starport', 'city']);

    const FLAGSHIP_CONFIG = {
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
        images: getColorImages(color)
    };

    const foregroundImages = flagshipInput
            .map((flagshipType, index) => {
                if (!flagshipType || index >= FLAGSHIP_CONFIG.positions.length) return null;

                return {
                    id: `flagship-${index}`,
                    src: FLAGSHIP_CONFIG.images[flagshipType],
                    alt: `flagship ${flagshipType} at position ${index + 1}`,
                    position: FLAGSHIP_CONFIG.positions[index],
                    size: FLAGSHIP_CONFIG.size,
                };
            })
            .filter((item): item is any => item !== null);


    return (<PositionedImages
        backgroundImage={flagshipBoard}
        backgroundAlt="playerBoard"
        foregroundImages={foregroundImages}></PositionedImages>);



}


type FlagshipInput = ('city' | 'starport' | '')[];



function getColorImages(color: Color) {
    switch (color) {
        case Color.Blue:
            return {
                city: GAME_IMAGES.city_blue,
                starport: GAME_IMAGES.starport_blue
            }
        case Color.Red:
            return {
                city: GAME_IMAGES.city_red,
                starport: GAME_IMAGES.starport_red
            }
        case Color.Yellow:
            return {
                city: GAME_IMAGES.city_yellow,
                starport: GAME_IMAGES.starport_yellow
            }
        case Color.White:
            return {
                city: GAME_IMAGES.city_white,
                starport: GAME_IMAGES.starport_white
            }
        default:
            return {
                city: GAME_IMAGES.city_free,
                starport: GAME_IMAGES.starport_free
            }
    }
}