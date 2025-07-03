import { AMBITION_MARKERS } from "@robertguglielmino/arcs-types";
import BackgroundImage from "../../generic/BackgroundImage";
import { useImageBus } from "@/stores/imageStore";

interface AmbitionProps {
    ambition: string,
    podium: {
        name: string,
        color: string
    }[][],
    declaredAmbitions: AMBITION_MARKERS[]
}

export default function Ambition({ ambition, podium, declaredAmbitions }: AmbitionProps) {
    const { getImageSrc: gameImages } = useImageBus("GAME_IMAGES");

    return (
        <div className="flex h-24 justify-end">
            <div className={`flex flex-col h-full max-h-24 justify-center`}>
                {declaredAmbitions.includes(AMBITION_MARKERS.FirstGold) && <img src={gameImages("firstGold")} className="h-9 object-contain" />}
                {declaredAmbitions.includes(AMBITION_MARKERS.FirstSilver) && <img src={gameImages("firstSilver")} className="h-9 object-contain" />}
                {declaredAmbitions.includes(AMBITION_MARKERS.SecondGold) && <img src={gameImages("secondGold")} className="h-9 object-contain" />}
                {declaredAmbitions.includes(AMBITION_MARKERS.SecondSilver) && <img src={gameImages("secondSilver")} className="h-9 object-contain" />}
                {declaredAmbitions.includes(AMBITION_MARKERS.ThirdGold) && <img src={gameImages("thirdGold")} className="h-9 object-contain" />}
                {declaredAmbitions.includes(AMBITION_MARKERS.ThirdSilver) && <img src={gameImages("thirdSilver")} className="h-9 object-contain" />}
                {declaredAmbitions.length == 0 && <img src={gameImages("thirdSilver")} className="h-8 m-1 opacity-0 object-contain" />}
            </div>
            <div className={`w-full font-header `}>
                <BackgroundImage className="w-full h-full" imageClassName={`object-contain object-right ${declaredAmbitions.length === 0 ? "brightness-40" : "brightness-100"}`} imageSrc={ambition}>
                    <div className="flex justify-end h-full">
                        <div className="max-h-auto h-auto w-1/4 max-w-1/4 m-1 mb-2 flex flex-col grow justify-end">
                            <div className="w-auto h-full flex flex-col justify-center items-center">
                                {podium[0].map(player => <div key={player.color} className={`flex items-center text-xs rounded font-body p-1 m-1 size-4 ${player.color}`}> </div>)}
                            </div>
                            <div className="bg-gold rounded-b h-auto basis-0 flex text-sm justify-center">
                                1st
                            </div>
                        </div>
                        <div className="max-h-auto h-auto w-1/4 max-w-1/4 m-1 mb-2 mr-2 flex flex-col grow justify-end">
                            <div className="w-auto h-full flex flex-wrap justify-around items-center">
                                {podium[1].map(player => <div key={player.color} className={`flex items-center justify-center text-xs rounded font-body size-4 m-1  ${player.color}`}> </div>)}
                            </div>
                            <div className="bg-silver rounded-b h-auto basis-0 flex text-sm justify-center">
                                2nd
                            </div>
                        </div>
                    </div>
                </BackgroundImage>
            </div>
        </div>
    );
}