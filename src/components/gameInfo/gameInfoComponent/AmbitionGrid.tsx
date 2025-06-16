import Ambition from "./Ambition";
import tycoon from "/src/assets/game/ambitions/tycoon.webp"
import tyrant from "/src/assets/game/ambitions/tyrant.webp"
import warlord from "/src/assets/game/ambitions/warlord.webp"
import keeper from "/src/assets/game/ambitions/keeper.webp"
import empath from "/src/assets/game/ambitions/empath.webp"
import { AmbitionMarkers } from "@/components/enums/AmbitionMarkers";
import { Ambitions } from "@/components/enums/Ambitions";

interface AmbitionGridProps {
    
}

const AMBITIONS_DATA = [
    {
        type: Ambitions.Tycoon,
        imageSrc: tycoon,
        podium: [[{ color: "bg-player-white", name: "rob"}], [{ color: "bg-player-yellow", name: "matt"}]],
        declaredAmbitions: [AmbitionMarkers.First_Gold]
    },
    {
        type: Ambitions.Tyrant,
        imageSrc: tyrant,
        podium: [[{ color: "bg-player-red", name: "darrell"}], []],
        declaredAmbitions: [AmbitionMarkers.Second_Gold]
    },
    {
        type: Ambitions.Warlord,
        imageSrc: warlord,
        podium: [[{ color: "bg-player-white", name: "rob"}], [{ color: "bg-player-yellow", name: "matt"}]],
        declaredAmbitions: []
    },
    {
        type: Ambitions.Keeper,
        imageSrc: keeper,
        podium: [[], [{ color: "bg-player-blue", name: "hunter"}, { color: "bg-player-white", name: "matt"}, { color: "bg-player-yellow", name: "matt"}, { color: "bg-player-red", name: "matt"}]],
        declaredAmbitions: [AmbitionMarkers.Third_Silver]
    },
    {
        type: Ambitions.Empath,
        imageSrc: empath,
        podium: [[{ color: "bg-player-white", name: "rob"}], [{ color: "bg-player-yellow", name: "matt"}]],
        declaredAmbitions: []
    }
]


export default function AmbitionGrid({  }: AmbitionGridProps) {
    
    return (<div className="w-full ">
        {AMBITIONS_DATA.map(ambition => (<Ambition
            key={ambition.type}
            ambition={ambition.imageSrc}
            podium={ambition.podium}
            declaredAmbitions={ambition.declaredAmbitions}/>))}    
    </div>);
}