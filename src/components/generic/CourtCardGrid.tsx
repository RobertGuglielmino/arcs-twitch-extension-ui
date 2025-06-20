import { APP_IMAGES } from "@/assets/app";
import BackgroundImage from "./BackgroundImage";
import { getColor } from "@/utils/getColor";
import type { CourtCard } from "@robertguglielmino/arcs-types";
import { COURT_IMAGES } from "@/assets/campaign/court";

interface CourtCardGridProps {
    cards: CourtCard[];
}

function CourtCardGrid({ cards }: CourtCardGridProps) {
    return (
        <BackgroundImage className="m-2 max-h-full" imageClassName="rounded-sm object-cover" imageSrc={APP_IMAGES.background}>
            <div className="flex flex-wrap justify-center w-auto h-full gap-2 p-4 overflow-hidden">
                {cards.length > 0 ? cards.map((card, i) => <div 
                    key={i}
                    style={{
                        width: `calc((100% - ${(cards.length - 1) * 0.5}rem) / ${Math.min(cards.length, 4)})`,
                        maxWidth: '130px'
                    }}>
                    <div className="flex gap-2 mb-1 w-full justify-center">
                        {card.agents.map(agent => {
                            // const textColor = getTextColor(agent.color);
                            return (<div key={agent.color} className={`flex text-center font-body text-sm px-1 rounded ${getColor(agent.color)} `}>
                                {agent.value}    
                            </div>)
                        })}
                    </div>
                    <img
                    key={i}
                    src={COURT_IMAGES[card.id as keyof typeof COURT_IMAGES]}
                    className="flex-shrink min-w-0 max-h-full object-contain" />
                    </div>) : <div  className="font-body text-2xl text-white">No cards here!</div>}
            </div>
        </BackgroundImage>);
}


export default CourtCardGrid;