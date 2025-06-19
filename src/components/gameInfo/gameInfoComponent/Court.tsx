import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";
import HoverGrid from "@/components/generic/HoverGrid";
import { CAMPAIGN_IMAGES } from "@/assets/campaign";
// import type { CourtCard } from "@/components/enums/GameData";
import CourtCardGrid from "@/components/generic/CourtCardGrid";
import { Color } from "@/components/enums/Colors";
import { COURT_IMAGES } from "@/assets/campaign/court";

interface CourtProps {
    cards: CourtCard[]
}


interface CourtCard {
    id: string,
    agents: Agent[]
}

interface Agent {
    color: Color;
    value: number;
}


export default function Court({ cards }: CourtProps) {
    const [hover, setHover] = useState(false);

    const courtCardsParsed = cards.map(card => CAMPAIGN_IMAGES[card.id as keyof typeof CAMPAIGN_IMAGES]);

    const cardss = [{
        id: COURT_IMAGES.f01_07,
        agents: [{
            color: Color.Red,
            value: 1
        },
        {
            color: Color.White,
            value: 1
        },
        {
            color: Color.Yellow,
            value: 1
        },
        {
            color: Color.Blue,
            value: 1
        }]
    },
    {
        id: COURT_IMAGES.f01_07,
        agents: [{
            color: Color.Red,
            value: 1
        },
        {
            color: Color.White,
            value: 1
        },
        {
            color: Color.Yellow,
            value: 1
        },
        {
            color: Color.Blue,
            value: 1
        }]
    },
    {
        id: COURT_IMAGES.f01_07,
        agents: [{
            color: Color.Red,
            value: 1
        },
        {
            color: Color.White,
            value: 1
        },
        {
            color: Color.Yellow,
            value: 1
        },
        {
            color: Color.Blue,
            value: 1
        }]
    },
    {
        id: COURT_IMAGES.f01_07,
        agents: [{
            color: Color.Red,
            value: 1
        },
        {
            color: Color.White,
            value: 1
        },
        {
            color: Color.Yellow,
            value: 1
        },
        {
            color: Color.Blue,
            value: 1
        }]
    },
    {
        id: COURT_IMAGES.f01_07,
        agents: [{
            color: Color.Red,
            value: 1
        },
        {
            color: Color.White,
            value: 1
        },
        {
            color: Color.Yellow,
            value: 1
        },
        {
            color: Color.Blue,
            value: 1
        }]
    },
    {
        id: COURT_IMAGES.f01_07,
        agents: [{
            color: Color.Red,
            value: 1
        },
        {
            color: Color.White,
            value: 1
        },
        {
            color: Color.Yellow,
            value: 1
        },
        {
            color: Color.Blue,
            value: 1
        }]
    } ]

    return (<div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex text-center font-header w-full">
            <div className="flex flex-col p-1 text-center justify-center w-full rounded-b-lg h-full bg-gold text-white">
                Court
            </div>

        <CenterDisplay showOn={hover}>
            <CourtCardGrid cards={cardss} />
        </CenterDisplay>
    </div>);
}