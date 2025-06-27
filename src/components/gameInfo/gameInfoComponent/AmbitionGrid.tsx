import Ambition from "./Ambition";
import { AmbitionMarkers } from "@/components/enums/AmbitionMarkers";
import { Ambitions } from "@/components/enums/Ambitions";
import { useImageBus } from "@/hooks/useImageBus";

interface AmbitionGridProps {

}

export default function AmbitionGrid({ }: AmbitionGridProps) {
    const { getImageSrc: gameImages } = useImageBus("GAME_IMAGES");

    const AMBITIONS_DATA = [
        {
            type: Ambitions.Blightkin,
            imageSrc: gameImages("blightkin"),
            podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
            declaredAmbitions: [AmbitionMarkers.First_Gold]
        },
        {
            type: Ambitions.Tycoon,
            imageSrc: gameImages("tycoon"),
            podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
            declaredAmbitions: [AmbitionMarkers.First_Gold]
        },
        {
            type: Ambitions.Tyrant,
            imageSrc: gameImages("tyrant"),
            podium: [[{ color: "bg-player-red", name: "darrell" }], []],
            declaredAmbitions: [AmbitionMarkers.Second_Gold]
        },
        {
            type: Ambitions.Warlord,
            imageSrc: gameImages("warlord"),
            podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
            declaredAmbitions: []
        },
        {
            type: Ambitions.Keeper,
            imageSrc: gameImages("keeper"),
            podium: [[], [{ color: "bg-player-blue", name: "hunter" }, { color: "bg-player-white", name: "matt" }, { color: "bg-player-yellow", name: "matt" }, { color: "bg-player-red", name: "matt" }]],
            declaredAmbitions: [AmbitionMarkers.Third_Silver]
        },
        {
            type: Ambitions.Empath,
            imageSrc: gameImages("empath"),
            podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
            declaredAmbitions: []
        },
        {
            type: Ambitions.Edenguard,
            imageSrc: gameImages("edenguard"),
            podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
            declaredAmbitions: []
        }
    ]

    return (<div className="w-full ">
        {AMBITIONS_DATA.map(ambition => (<Ambition
            key={ambition.type}
            ambition={ambition.imageSrc}
            podium={ambition.podium}
            declaredAmbitions={ambition.declaredAmbitions} />))}
    </div>);
}