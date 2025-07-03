
import type { GeneralData } from '@robertguglielmino/arcs-types';
import AmbitionGrid from "./gameInfoComponent/AmbitionGrid";
import Court from "./gameInfoComponent/Court";
import Edicts from "./gameInfoComponent/Edicts";

interface GameInfoTabProps {
    data: GeneralData,
    players: any
}

export default function GameInfoTab({ data, players }: GameInfoTabProps) {

    return (<div className="flex flex-col justify-center items-center right-0 w-61 h-1/3 fixed  top-1/2 transform -translate-y-1/2">
        <Edicts cards={data.edicts} />
        <AmbitionGrid declaredAmbitions={data.ambitionDeclarations} players={players} ambitionProgress={data.ambitionPodium} blightkinActive={data.hasBlightkin} edenguardActive={data.hasEdenguard} />
        <Court cards={data.courtCards} />
    </div>);
}