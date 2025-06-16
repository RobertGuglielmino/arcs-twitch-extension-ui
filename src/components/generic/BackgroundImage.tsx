interface BackgroundImageProps {
    imageSrc: string,
    className?: string,
    imageClassName?: string,
    children: any,
}

export default function BackgroundImage({ 
    imageSrc, 
    className = "", 
    imageClassName = "",
    children 
}: BackgroundImageProps) {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-0 z-0 opacity-90">
                <img
                    src={imageSrc}
                    alt={imageSrc}
                    className={`w-full h-full ${imageClassName}`} 
                />
            </div>
            <div className="relative h-full z-10">
                {children}
            </div>
        </div>
    );
}