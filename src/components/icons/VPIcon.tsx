import { APP_IMAGES } from "@/assets/app";
import BackgroundImage from "../generic/BackgroundImage"

interface VPIconProps {
    power: number
}

export default function VPIcon({ power }: VPIconProps) {

    return (<div className="flex flex-col gap-1">
        {/* <img className="object-contain" src={APP_IMAGES.objective} /> */}
        <div className="flex items-center justify-center text-5xl">
            {power}
        </div>
        <div className="flex items-center justify-center font-body text-xs">
            POWER
        </div>
    </div>);

    return (<BackgroundImage className="h-auto" imageClassName="content-center  " imageSrc={APP_IMAGES.VP}>
        <div className="flex flex-col text-center h-full  items-center text-white">
            {power}
        </div>
    </BackgroundImage>);
}