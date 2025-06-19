import { useState } from "react";
// import BackgroundImage from "../../generic/BackgroundImage";
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
                {/* <BackgroundImage
                    imageSrc={imageSrc}
                    imageClassName="object-contain"
                    className="overflow-y-hidden h-full">
                    <div className="flex flex-col p-1 text-center justify-center h-full">
                        {text}
                    </div>
                </BackgroundImage> */}
            </div>
            <CenterDisplay showOn={hover}>
                {children}
            </CenterDisplay>
        </div>);
}