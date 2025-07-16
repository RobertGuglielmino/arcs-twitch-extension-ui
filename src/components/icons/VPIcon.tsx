interface VPIconProps {
    power: number
}

export default function VPIcon({ power }: VPIconProps) {
    return (<div className="flex flex-col">
        {/* <img className="object-contain" src={APP_IMAGES.objective} /> */}
        <div className="flex items-center justify-center text-xl -mt-1">
            {power}
        </div>
        <div className="flex items-center justify-center font-body text-xs -mt-1">
            Power
        </div>
    </div>);
}