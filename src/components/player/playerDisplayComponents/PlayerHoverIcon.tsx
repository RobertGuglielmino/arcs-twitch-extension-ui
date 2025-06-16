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
        <div className="w-10">
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="font-body size-full">
                    <img src={imageSrc} className="overflow-y-hidden object-contain"/>
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