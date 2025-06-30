
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
import { getTextColor } from "@/utils/getTextColor";
import { GAME_IMAGES } from "@/assets/game";
// import { FATES_IMAGES } from "@/assets/campaign/fates";
import { useImageBus } from "@/stores/imageStore";
import { useEffect } from "react";

interface PlayerCardProps {
    playerName: string,
    fate: string,
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
    const { getImageSrc, isImageLoaded, isImageLoading } = useImageBus('GAME_IMAGES');
    const { getImageSrc: getCampaignImage } = useImageBus('CAMPAIGN_IMAGES');
    const { getImageSrc: getAppImage } = useImageBus('APP_IMAGES');
    const courtCardsParsed = courtCards;//.map(card => COURT_IMAGES[card as keyof typeof COURT_IMAGES]);
    const bgColor = getColor(color);
    const textColor = getTextColor(color);

    // Debug logging
    useEffect(() => {
        console.log('PlayerCard mounted');
        console.log('Board image loaded:', isImageLoaded('board'));
        console.log('Board image loading:', isImageLoading('board'));
        console.log('Board image src:', getImageSrc('board'));
    }, [isImageLoaded, isImageLoading, getImageSrc]);



    return (
        <div className={`flex flex-col justify-center w-full max-w-61`}>
            <BackgroundImage
                imageSrc={getAppImage("background")}
                imageClassName="object-cover">
                <div className={`flex flex-row h-full justify-between font-header top-0 gap-1`}>
                    <div className="w-30 max-w-30">
                        <BackgroundImage
                            imageSrc={fate}
                            imageClassName="object-cover object-top "
                            className="overflow-y-hidden h-full">
                            <div className="flex flex-col items-center h-full justify-end pb-2">
                                <div className={`text-xs rounded h-auto flex flex-col items-center justify-center w-auto p-1 ${bgColor}`}>
                                    {playerName}
                                </div>
                                <div className={`text-xs rounded h-auto flex flex-col items-center justify-center w-auto mx-1 text-white `}>
                                    fate
                                </div>
                            </div>
                        </BackgroundImage>
                    </div>
                    <div className={` ${textColor} flex flex-col flex-shrink flex-wrap justify-evenly content-center w-full max-w-15 `}>
                        <ObjectiveIcon objectiveScore={objectiveScore} />
                        <VPIcon power={power} />
                    </div>
                    <div className="flex flex-col shrink justify-around m-1">
                        <PlayerHoverIcon imageSrc={GAME_IMAGES.material} >
                            <PlayerBoardDisplay 
                                playerBoard={getImageSrc('board')} 
                                resources={resources} 
                                cities={cities} 
                                outrage={outrage} 
                                trophies={warlord} 
                                captives={tyrant} 
                                color={color} 
                            />
                        </PlayerHoverIcon>
                        <PlayerHoverIcon imageSrc={getCampaignImage("flagship")}>
                            <FlagshipBoardDisplay color={color} />
                        </PlayerHoverIcon>
                        <PlayerHoverIcon imageSrc={getImageSrc("cardBackSideways")} >
                            <HoverGrid cards={courtCardsParsed} />
                        </PlayerHoverIcon>
                    </div>
                </div>
            </BackgroundImage>
            <div className="flex flex-wrap gap-1 pl-1 py-1 w-full text-center">
                {titles.map(title => <PlayerTitleChip key={title} title={title} />)}
            </div>
        </div>
    );
}