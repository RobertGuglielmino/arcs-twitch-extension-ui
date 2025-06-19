
import type { GeneralData } from "../enums/GameData";
import AmbitionGrid from "./gameInfoComponent/AmbitionGrid";
import Court from "./gameInfoComponent/Court";
import Edicts from "./gameInfoComponent/Edicts";

interface GameInfoTabProps {
    data: GeneralData
}



export default function GameInfoTab({ data }: GameInfoTabProps) {

    const cards = data.courtCards;

    return (<div className="flex flex-col justify-center items-center right-0 w-61 h-1/3 fixed  top-1/2 transform -translate-y-1/2">
    {/* return (<div className=""> */}
        <Edicts cards={cards} />
        <AmbitionGrid />
        <Court cards={[]} />
    </div>);
}