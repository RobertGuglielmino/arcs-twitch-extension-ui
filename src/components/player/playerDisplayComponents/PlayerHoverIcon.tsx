import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";

interface PlayerHoverIconProps {
    imageSrc: string,
    children: any
}

export default function PlayerHoverIcon({ imageSrc, children }: PlayerHoverIconProps) {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <div className="shrink max-w-10 max-h-full">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="font-body aspect-square">
                <img src={imageSrc} className="w-full h-full object-contain"/>
            </div>
            <CenterDisplay showOn={hover}>
                {children}
            </CenterDisplay>
        </div>
    );
}