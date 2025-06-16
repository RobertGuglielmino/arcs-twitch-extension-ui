import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";
import HoverGrid from "@/components/generic/HoverGrid";
import { CAMPAIGN_IMAGES } from "@/assets/campaign";
import type { CourtCard } from "@/components/enums/GameData";

interface CourtProps {
    cards: CourtCard[]
}

export default function Court({ cards }: CourtProps) {
    const [hover, setHover] = useState(false);

    const courtCardsParsed = cards.map(card => CAMPAIGN_IMAGES[card.id as keyof typeof CAMPAIGN_IMAGES]);

    return (<div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex text-center font-header w-full">
            <div className="flex flex-col p-1 text-center justify-center w-full rounded-b-lg h-full bg-gold text-white">
                Court
            </div>

        <CenterDisplay showOn={hover}>
            <HoverGrid cards={courtCardsParsed} />
        </CenterDisplay>
    </div>);
}