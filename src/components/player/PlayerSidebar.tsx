import type { PlayerData } from "../enums/GameData";
import PlayerCard from "./playerDisplayComponents/PlayerCard";
import { Color } from "../enums/Colors";
import { useImageBus } from "@/stores/imageStore";

interface PlayerSidebarProps {
    data: PlayerData
}

export default function PlayerSidebar({ data }: PlayerSidebarProps) {
    const { getImageSrc } = useImageBus('FATES_IMAGES');
    console.log(data.fate);

    return (<div className="flex flex-col items-center justify-center h-1/3 fixed left-0 top-1/2 transform -translate-y-1/2">
        {data.name.map((_, index) => <PlayerCard
            key={data.name[index]}
            playerName={data.name[index]}
            fate={getImageSrc(data.fate[index])}
            color={getColorFromString(data.color[index])}
            objectiveScore={data.objectiveProgress[index]}
            cities={data.supply.cities[index]}
            power={data.power[index]}
            resources={data.resources[index]}
            outrage={data.outrage[index]}
            courtCards={data.courtCards[index]}
            tyrant={data.ambitionProgress.tyrant[index]}
            warlord={data.ambitionProgress.warlord[index]}
            // flagships={data.flagships[index]}
            titles={data.titles[index]}
            />)}
    </div>);
}

function getColorFromString(colorStr: string): Color {
    const normalizedColor = colorStr.toLowerCase();
    switch (normalizedColor) {
        case 'red': return Color.Red;
        case 'blue': return Color.Blue;
        case 'yellow': return Color.Yellow;
        case 'white': return Color.White;
        case 'purple': return Color.Purple;
        default: 
            console.warn(`Unknown color: ${colorStr}, defaulting to Red`);
            return Color.Red;
    }
};

// function getFateFromString(fateStr: string): Fates {
//     const normalizedInput = fateStr.toLowerCase().replace(/\s+/g, '');
    
//     // Try to find a matching enum value
//     const matchingFate = Object.values(Fates).find(fate => 
//         fate.toLowerCase() === normalizedInput
//     );
    
//     if (matchingFate) {
//         return matchingFate;
//     }

//     // Fallback: try to match enum keys (for cases like "PlanetBreaker" vs "planetbreaker")
//     const enumKey = Object.keys(Fates).find(key => 
//         key.toLowerCase() === normalizedInput
//     );
    
//     if (enumKey) {
//         return Fates[enumKey as keyof typeof Fates];
//     }

//     console.warn(`Unknown fate: ${fateStr}, defaulting to Steward`);
//     return Fates.Steward;
// }
