import { Color } from "@robertguglielmino/arcs-types";
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
import { useImageBus } from "@/stores/imageStore";
import { fateIdToName } from "@/utils/fateData";
import type { RESOURCES } from "@robertguglielmino/arcs-types";
import { getFlagshipConfig } from "@/utils/getFlagshipConfig";
import { getPlayerResourceConfig } from "@/utils/getPlayerResourceConfig";
import { getPlayerCityConfig } from "@/utils/getPlayerCityConfig";

type FlagshipSpot = "city" | "starport" | "";
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
    hasFlagship: boolean,
    flagshipBoard?: FlagshipSpot[],
    titles?: string[],
}

export default function PlayerCard({ playerName, fate, color, tyrant, warlord, resources, cities, outrage, objectiveScore, power, courtCards, hasFlagship, flagshipBoard = [], titles = [] }: PlayerCardProps) {
    const { getImageSrc: getGameImage } = useImageBus('GAME_IMAGES');
    const { getImageSrc: getCampaignImage } = useImageBus('CAMPAIGN_IMAGES');
    const { getImageSrc: getCourtImage } = useImageBus('COURT_IMAGES');
    const { getImageSrc: getAppImage } = useImageBus('APP_IMAGES');
    const { getImageSrc: getFateImages } = useImageBus('FATES_IMAGES');

    const courtCardsParsed = courtCards.map(card => getCourtImage(card));
    const bgColor = getColor(color);
    const textColor = getTextColor(color);
    const FLAGSHIP_CONFIG = getFlagshipConfig(color, getGameImage);
    const CITY_CONFIG = getPlayerCityConfig(color, getGameImage);
    const RESOURCE_CONFIG = getPlayerResourceConfig(getGameImage);


    return (
        <div className={`flex flex-col justify-center w-full max-w-44`}>
            <BackgroundImage
                imageSrc={getAppImage("background")}
                imageClassName="object-cover">
                <div className={`flex flex-row h-full justify-between font-header top-0`}>
                    <div className="w-32 max-w-32">
                        <BackgroundImage
                            imageSrc={getFateImages(fate)}
                            imageClassName="object-cover object-top "
                            className="overflow-y-hidden h-full">
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex flex-row justify-end w-auto">
                                    <div className={`flex flex-row justify-end h-auto rounded-bl px-1 ${bgColor}`}>
                                        <VPIcon power={power} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center h-auto pb-1">
                                    <div className={`text-xs rounded-xs h-auto flex flex-col items-center justify-center w-auto px-1 mx-1 text-white bg-black`}>
                                        {fateIdToName(fate as keyof typeof fateIdToName)}
                                    </div>
                                    <div className={`text-xs rounded-xs h-auto flex flex-col items-center justify-center w-auto px-1 ${bgColor}`}>
                                        {playerName}
                                    </div>
                                </div>
                            </div>
                        </BackgroundImage>
                    </div>
                    <div className={` ${textColor} flex flex-col flex-shrink flex-wrap justify-evenly content-center items-center w-full max-w-12 my-1`}>
                        <PlayerHoverIcon imageSrc={getGameImage('material')} >
                            <PlayerBoardDisplay
                                playerBoard={getGameImage('board')}
                                resources={resources}
                                cities={cities}
                                outrage={outrage}
                                trophies={warlord}
                                captives={tyrant}
                                color={color}
                                cityConfig={CITY_CONFIG}
                                resourceConfig={RESOURCE_CONFIG}
                            />
                        </PlayerHoverIcon>

                        {hasFlagship ?
                            <PlayerHoverIcon imageSrc={getCampaignImage("flagship")}>
                                <FlagshipBoardDisplay imageSrc={getCampaignImage("flagshipBoard")} flagshipBoard={flagshipBoard} config={FLAGSHIP_CONFIG} />
                            </PlayerHoverIcon> :
                            
                            <div className="shrink max-w-9 max-h-full font-body aspect-square">
                                <img src={getCampaignImage("flagship")} className="w-full h-full object-contain grayscale-50 opacity-50" />
                            </div>}

                        <PlayerHoverIcon imageSrc={getGameImage("cardBackSideways")} >
                            <HoverGrid cards={courtCardsParsed} />
                        </PlayerHoverIcon>

                        <ObjectiveIcon objectiveScore={objectiveScore} />
                    </div>
                </div>
            </BackgroundImage>
            <div className="flex flex-wrap gap-1 pl-1 py-1 w-full text-center overflow-x">
                {titles.map(title => <PlayerTitleChip key={title} title={title} />)}
            </div>
        </div>
    );
}