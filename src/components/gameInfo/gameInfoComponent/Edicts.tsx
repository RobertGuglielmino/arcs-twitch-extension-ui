import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";
import HoverGrid from "@/components/generic/HoverGrid";
import { useImageBus } from "@/hooks/useImageBus";

interface EdictsProps {
    cards: string[]
}

export default function Edicts({ cards }: EdictsProps) {
    const [hover, setHover] = useState(false);
    
    const { getImageSrc: courtImages } = useImageBus("COURT_IMAGES");

    const edictCardsParsed = cards.map(card => courtImages(card));


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