interface VPIconProps {
    power: number
}

export default function VPIcon({ power }: VPIconProps) {
    return (<div className="flex flex-col gap-1 px-1">
        {/* <img className="object-contain" src={APP_IMAGES.objective} /> */}
        <div className="flex items-center justify-center text-4xl">
            {power}
        </div>
        <div className="flex items-center justify-center font-body text-xs">
            POWER
        </div>
    </div>);
}