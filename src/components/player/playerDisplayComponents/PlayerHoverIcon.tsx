import { useState } from "react";
import CenterDisplay from "../../generic/CenterDisplay";

interface PlayerHoverIconProps {
    imageSrc: string,
    text: string,
    children: any
}

export default function PlayerHoverIcon({ imageSrc, children }: PlayerHoverIconProps) {
    const [hover, setHover] = useState(false);

    return (
        <div className="shrink max-w-10 max-h-full">
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="font-body aspect-square">
                    <img src={imageSrc} className="w-full h-full object-contain"/>
            </div>
            <CenterDisplay showOn={hover}>
                {children}
            </CenterDisplay>
        </div>);
}