
import { PositionedImages } from "@/components/generic/PositionedImages";


type FlagshipInput = ('city' | 'starport' | '')[];

interface FlagshipBoardDisplayProps {
    imageSrc: string,
    config: any,
    flagshipBoard: FlagshipInput
}

export default function FlagshipBoardDisplay({ config, imageSrc, flagshipBoard }: FlagshipBoardDisplayProps) {


    const foregroundImages = flagshipBoard
            .map((flagshipType, index) => {
                if (!flagshipType || index >= config.positions.length) return null;

                return {
                    id: `flagship-${index}`,
                    src: config.images[flagshipType],
                    alt: `flagship ${flagshipType} at position ${index + 1}`,
                    position: config.positions[index],
                    size: config.size,
                };
            })
            .filter((item): item is any => item !== null);
        

    return (<PositionedImages
        backgroundImage={imageSrc}
        backgroundAlt="playerBoard"
        foregroundImages={foregroundImages}></PositionedImages>);

}