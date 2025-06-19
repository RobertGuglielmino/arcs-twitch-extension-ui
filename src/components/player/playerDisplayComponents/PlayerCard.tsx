import BackgroundImage from "../../generic/BackgroundImage";
import ObjectiveIcon from "../../icons/ObjectiveIcon";
import PlayerHoverIcon from "./PlayerHoverIcon";
import VPIcon from "../../icons/VPIcon";
import PlayerBoardDisplay from "../playerBoard/PlayerBoardDisplay";
import { FATES_IMAGES } from "@assets/campaign/fates";
import { GAME_IMAGES } from "@assets/game";
import { APP_IMAGES } from "@/assets/app";
import PlayerTitleChip from "./PlayerTitleChip";
import HoverGrid from "../../generic/HoverGrid";
import { COURT_IMAGES } from "@/assets/campaign/court";
import type { Fates } from "@/components/enums/Fates";
// import FlagshipBoardDisplay from "../playerBoard/FlagshipBoardDisplay";
import type { Color } from "@/components/enums/Colors";
import type { RESOURCES } from "@/components/enums/Resources";
import FlagshipBoardDisplay from "../playerBoard/FlagshipBoardDisplay";
import { getColor } from "@/utils/getColor";
// import ImageAboveText from "../ImageAboveText";

interface PlayerCardProps {
    playerName: string,
    fate: Fates,
    color: Color,
    tyrant: number,
    warlord: number,
    resources: RESOURCES[],
    cities: number,
    outrage: boolean[],
    objectiveScore: number,
    power: number,
    courtCards: string[],
    titles?: string[],
}

export default function PlayerCard({ playerName, fate, color, tyrant, warlord, resources, cities, outrage, objectiveScore, power, courtCards, titles = [] }: PlayerCardProps) {

    const bgColor = getColor(color);
    const textColor = getTextColor(color);

    const courtCardsParsed = courtCards.map(card => COURT_IMAGES[card as keyof typeof COURT_IMAGES]);

    return (<div className={`flex flex-col justify-center w-full max-w-61`}>
        <BackgroundImage
        imageSrc={APP_IMAGES.background}
        imageClassName="object-cover">
            <div className={`flex flex-row h-full justify-between font-header top-0 gap-1`}>
                <div className="w-30 max-w-30">
                    <BackgroundImage
                        imageSrc={FATES_IMAGES[fate]}
                        imageClassName="object-cover object-top "
                        className="overflow-y-hidden h-full">
                        <div className="flex flex-col items-center h-full justify-end pb-2">
                            <div className={`text-xs rounded h-auto flex flex-col items-center justify-center w-auto p-1 ${bgColor}`}>
                                {playerName}
                            </div>
                            <div className={`text-xs rounded h-auto flex flex-col items-center justify-center w-auto mx-1 text-white `}>
                                {fate}
                            </div>
                        </div>
                    </BackgroundImage>
                </div>
                <div className={` ${textColor} flex flex-col flex-shrink flex-wrap justify-evenly content-center w-full max-w-15 `}>
                    <ObjectiveIcon objectiveScore={objectiveScore} />
                    <VPIcon power={power} />
                </div>
                <div className="flex flex-col shrink justify-around m-1">
                    <PlayerHoverIcon imageSrc={GAME_IMAGES["material"]} text="Board">
                        <PlayerBoardDisplay resources={resources} cities={cities} outrage={outrage} trophies={warlord} captives={tyrant} color={color} />
                    </PlayerHoverIcon>
                    <PlayerHoverIcon imageSrc={"/src/assets/campaign/flagship.png"} text="Cards">
                        <FlagshipBoardDisplay color={color} />
                    </PlayerHoverIcon>
                    <PlayerHoverIcon imageSrc={GAME_IMAGES["cardBackSideways"]} text="Cards">
                        <HoverGrid cards={courtCardsParsed} />
                    </PlayerHoverIcon>
                </div>
            </div>
        </BackgroundImage>
        <div className="flex flex-wrap gap-1 pl-1 py-1 w-full text-center">
            {titles.map(title => <PlayerTitleChip key={title} title={title} />)}
        </div>
    </div>);
}

function getTextColor(color: string) {
    switch (color) {
        case "yellow":
            return "text-player-yellow"
        case "red":
            return "text-player-red"
        case "blue":
            return "text-player-blue"
        case "white":
            return "text-player-white"
        default:
            return "text-white"
    }
}
