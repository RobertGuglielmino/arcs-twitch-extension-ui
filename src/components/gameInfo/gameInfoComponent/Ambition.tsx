import { GAME_IMAGES } from "@/assets/game";
import BackgroundImage from "../../generic/BackgroundImage";
import { AmbitionMarkers } from "../../enums/AmbitionMarkers";

interface AmbitionProps {
    ambition: string,
    podium: {
        name: string,
        color: string
    }[][],
    declaredAmbitions: AmbitionMarkers[]
}

export default function Ambition({ ambition, podium, declaredAmbitions }: AmbitionProps) {
    return (
        <div className="flex">
            <div className={`flex flex-col h-full`}>
                {declaredAmbitions.includes(AmbitionMarkers.First_Gold) ?
                    <img src={GAME_IMAGES.firstGold} className="h-8 object-contain" /> :
                    declaredAmbitions.includes(AmbitionMarkers.First_Silver) ?
                        <img src={GAME_IMAGES.firstSilver} className="h-8 object-contain" /> :
                        <div className="size-6 grayscale bg-gray-800 rounded-xs opacity-20 object-center m-1" />}
                {declaredAmbitions.includes(AmbitionMarkers.Second_Gold) ?
                    <img src={GAME_IMAGES.secondGold} className="h-8 object-contain" /> :
                    declaredAmbitions.includes(AmbitionMarkers.Second_Silver) ?
                        <img src={GAME_IMAGES.secondSilver} className="h-8 object-contain" /> :
                        <div className="size-6 grayscale bg-gray-800 rounded-xs opacity-20 object-center m-1" />}
                {declaredAmbitions.includes(AmbitionMarkers.Third_Gold) ?
                    <img src={GAME_IMAGES.thirdGold} className="h-8 object-contain" /> :
                    declaredAmbitions.includes(AmbitionMarkers.Third_Silver) ?
                        <img src={GAME_IMAGES.thirdSilver} className="h-8 object-contain" /> :
                        <div className="size-6 grayscale bg-gray-800 rounded-xs opacity-20 object-center m-1" />}
            </div>
            <div className="w-full font-header">
                <BackgroundImage className="w-full h-full" imageClassName="object-contain" imageSrc={ambition}>
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