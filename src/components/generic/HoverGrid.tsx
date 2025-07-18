import { useImageBus } from "@/stores/imageStore";
import BackgroundImage from "./BackgroundImage";

interface HoverGridProps {
    cards: string[];
}

export default function HoverGrid({ cards }: HoverGridProps) {
    const { getImageSrc: appImages } = useImageBus("APP_IMAGES");


    return (
        <BackgroundImage className="m-2 max-h-full" imageClassName="rounded-sm object-cover" imageSrc={appImages("background")}>
            <div className="flex flex-wrap justify-center w-auto h-full gap-2 p-2 overflow-hidden">
                {cards.length > 0 ? cards.map((card, i) => <img
                    key={i}
                    src={card}
                    style={{
                        width: `calc((100% - ${(cards.length - 1) * 0.5}rem) / ${Math.min(cards.length, 4)})`,
                        maxWidth: '150px'
                    }}
                    className="flex-shrink min-w-0 max-h-full object-contain" />) : <div  className="font-body text-2xl text-white">No cards here!</div>}
            </div>
        </BackgroundImage>);
}
