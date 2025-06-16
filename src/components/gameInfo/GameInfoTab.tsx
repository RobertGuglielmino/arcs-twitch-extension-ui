
import type { GeneralData } from "../enums/GameData";
import AmbitionGrid from "./gameInfoComponent/AmbitionGrid";
import Court from "./gameInfoComponent/Court";
import Edicts from "./gameInfoComponent/Edicts";

interface GameInfoTabProps {
    data: GeneralData
}

export default function GameInfoTab({ data }: GameInfoTabProps) {

    const cards = data.courtCards;

    return (<div className="flex flex-col justify-center items-center h-full right-0 absolute w-61">
    {/* return (<div className=""> */}
        <Edicts cards={cards} />
        <AmbitionGrid />
        <Court cards={cards} />
    </div>);
}