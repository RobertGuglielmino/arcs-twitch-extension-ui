
import type { Fates } from "@/components/enums/Fates";
import type { Color } from "@/components/enums/Colors";
import type { RESOURCES } from "@/components/enums/Resources";
import BackgroundImage from "../../generic/BackgroundImage";
import HoverGrid from "../../generic/HoverGrid";
import ObjectiveIcon from "../../icons/ObjectiveIcon";
import VPIcon from "../../icons/VPIcon";
import PlayerHoverIcon from "./PlayerHoverIcon";
import PlayerTitleChip from "./PlayerTitleChip";
import FlagshipBoardDisplay from "../playerBoard/FlagshipBoardDisplay";
import PlayerBoardDisplay from "../playerBoard/PlayerBoardDisplay";
import { getColor } from "@/utils/getColor";
import { useImageBus } from "@/hooks/useImageBus";
import { getTextColor } from "@/utils/getTextColor";

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
    const { getImageSrc: courtImages } = useImageBus("COURT_IMAGES");
    const { getImageSrc: gameImages } = useImageBus("GAME_IMAGES");
    const { getImageSrc: fateImages } = useImageBus("FATES_IMAGES");
    const { getImageSrc: appImages } = useImageBus("APP_IMAGES");
    const { getImageSrc: campaignImages } = useImageBus("CAMPAIGN_IMAGES");

    const courtCardsParsed = courtCards.map(card => courtImages(card));
    const bgColor = getColor(color);
    const textColor = getTextColor(color);

    return (<div className={`flex flex-col justify-center w-full max-w-61`}>
        <BackgroundImage
        imageSrc={appImages("background")}
        imageClassName="object-cover">
            <div className={`flex flex-row h-full justify-between font-header top-0 gap-1`}>
                <div className="w-30 max-w-30">
                    <BackgroundImage
                        imageSrc={fateImages(fate)}
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
                    <PlayerHoverIcon imageSrc={gameImages("material")} text="Board">
                        <PlayerBoardDisplay resources={resources} cities={cities} outrage={outrage} trophies={warlord} captives={tyrant} color={color} />
                    </PlayerHoverIcon>
                    <PlayerHoverIcon imageSrc={campaignImages("flagship")} text="Cards">
                        <FlagshipBoardDisplay color={color} />
                    </PlayerHoverIcon>
                    <PlayerHoverIcon imageSrc={gameImages("cardBackSideways")} text="Cards">
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
