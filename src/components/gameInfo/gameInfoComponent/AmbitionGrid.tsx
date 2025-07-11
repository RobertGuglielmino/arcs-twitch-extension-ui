import Ambition from "./Ambition";
import { useImageBus } from "@/stores/imageStore";
import { getColor } from "@/utils/getColor";
import { AMBITIONS } from "@robertguglielmino/arcs-types";

interface AmbitionProgressType {
    tycoon: number[][],
    tyrant: number[][],
    warlord: number[][],
    keeper: number[][],
    empath: number[][],
}

interface AmbitionType {
    type: AMBITIONS;
    imageSrc: string;
    podium: {
        color: any;
        name: any;
    }[][];
    declaredAmbitions: string[]
}
interface AmbitionGridProps {
    declaredAmbitions: {
        tycoon: string[],
        tyrant: string[],
        warlord: string[],
        keeper: string[],
        empath: string[],
        edenguard?: string[],
        blightkin?: string[]
    },
    players: any,
    ambitionProgress: AmbitionProgressType,
    blightkinActive: boolean,
    edenguardActive: boolean
}

export default function AmbitionGrid({ declaredAmbitions, players, ambitionProgress, blightkinActive, edenguardActive }: AmbitionGridProps) {
    const { getImageSrc: gameImages } = useImageBus("GAME_IMAGES");
    let AMBITION_DATA: AmbitionType[] = [];

    // console.log(ambitionProgress.tycoon);
    // console.log(JSON.stringify(players));
    // console.log(JSON.stringify(ambitionProgress.tycoon.map(position =>
    //     position.map(player => ({
    //         color: getColor(players.color[player]),
    //         name: players.name[player]
    //     }))
    // )));

    ambitionProgress.tycoon.map(position =>
        position.map(player => ({
            color: players.color[player],
            name: players.name[player]
        }))
    )

    if (edenguardActive) AMBITION_DATA.push({
        type: AMBITIONS.Edenguard,
        imageSrc: gameImages("edenguard"),
        podium: ambitionProgress.tycoon.map((_, index) => {
            return [{ color: players.color[index], name: players.name[index] }]
        }), //[[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
        declaredAmbitions: declaredAmbitions.edenguard!
    });

    function getPodium(ambition: keyof AmbitionProgressType) {
        return ambitionProgress[ambition].map((position: number[]) =>
            position.map(player => ({
                color: getColor(players.color[player]),
                name: players.name[player]
            }))
        )
    }

    const BASE_AMBITION_DATA = [
        {
            type: AMBITIONS.Tycoon,
            imageSrc: gameImages("tycoon"),
            podium: getPodium("tycoon"),
            declaredAmbitions: declaredAmbitions.tycoon
        },
        {
            type: AMBITIONS.Tyrant,
            imageSrc: gameImages("tyrant"),
            podium: getPodium("tyrant"),
            declaredAmbitions: declaredAmbitions.tyrant
        },
        {
            type: AMBITIONS.Warlord,
            imageSrc: gameImages("warlord"),
            podium: getPodium("warlord"),
            declaredAmbitions: declaredAmbitions.warlord
        },
        {
            type: AMBITIONS.Keeper,
            imageSrc: gameImages("keeper"),
            podium: [[], [{ color: "bg-player-blue", name: "hunter" }, { color: "bg-player-white", name: "matt" }, { color: "bg-player-yellow", name: "matt" }, { color: "bg-player-red", name: "matt" }]],
            declaredAmbitions: declaredAmbitions.keeper
        },
        {
            type: AMBITIONS.Empath,
            imageSrc: gameImages("empath"),
            podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
            declaredAmbitions: declaredAmbitions.empath
        },
    ]

    AMBITION_DATA.push(...BASE_AMBITION_DATA);

    if (blightkinActive) AMBITION_DATA.push({
        type: AMBITIONS.Blightkin,
        imageSrc: gameImages("blightkin"),
        podium: [[{ color: "bg-player-white", name: "rob" }], [{ color: "bg-player-yellow", name: "matt" }]],
        declaredAmbitions: declaredAmbitions.blightkin!
    });


    return (<div className="w-full">
        {AMBITION_DATA.map(ambition => (<Ambition
            key={ambition.type}
            ambition={ambition.imageSrc}
            podium={ambition.podium}
            declaredAmbitions={ambition.declaredAmbitions} />))}
    </div>);
}