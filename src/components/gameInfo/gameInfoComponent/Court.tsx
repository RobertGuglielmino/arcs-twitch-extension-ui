import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";
import CourtCardGrid from "@/components/generic/CourtCardGrid";
import type { CourtCard } from "@robertguglielmino/arcs-types";

interface CourtProps {
    cards: CourtCard[]
}



export default function Court({ cards }: CourtProps) {
    const [hover, setHover] = useState(false);
    

    return (<div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex text-center font-header w-full">
            <div className="flex flex-col p-1 text-center justify-center w-full rounded-b-lg h-full bg-gold text-white">
                Court
            </div>

        <CenterDisplay showOn={hover}>
            <CourtCardGrid cards={cards} />
        </CenterDisplay>
    </div>);
}