import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";
import HoverGrid from "@/components/generic/HoverGrid";
import { CAMPAIGN_IMAGES } from "@/assets/campaign";
import type { CourtCard } from "@/components/enums/GameData";

interface EdictsProps {
    cards: CourtCard[]
}

export default function Edicts({ cards }: EdictsProps) {
    const [hover, setHover] = useState(false);

    const edictCardsParsed = cards.map(card => CAMPAIGN_IMAGES[card.id as keyof typeof CAMPAIGN_IMAGES]);

    return (<div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex text-center font-header w-full">
        <div className="flex flex-col p-1 text-center justify-center w-full rounded-t-lg h-full bg-empire text-white">
            Edicts
        </div>
        <CenterDisplay showOn={hover}>
            <HoverGrid cards={edictCardsParsed} />
        </CenterDisplay>
    </div>);
}