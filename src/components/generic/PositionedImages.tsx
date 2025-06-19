import React from 'react';

// Define the structure for positioned images
export interface PositionedImage {
  id: string;
  src: string;
  alt: string;
  position: {
    top: number;
    left: number;
  };
  size?: {
    width: number;
    height?: number;
  };
  className?: string;
}

interface Position {
  x: number; 
  y: number; 
}

interface OverlayItem {
  id: string;
  position: Position;
  component: React.ReactNode;
  className?: string;
}

interface PositionedImagesProps {
  backgroundImage: any;
  backgroundAlt: string;
  foregroundImages: PositionedImage[];
  overlayItems?: OverlayItem[];
  containerClassName?: string;
}

export const PositionedImages: React.FC<PositionedImagesProps> = ({
  backgroundImage,
  backgroundAlt,
  foregroundImages,
  overlayItems,
  containerClassName = ""
}) => {
  return (
    <div className={`relative w-full h-auto ${containerClassName}`}>
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        className="w-full h-auto block"
      />
      
      {foregroundImages.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${image.className || ''}`}
          style={{
            top: `${image.position.top}%`,
            left: `${image.position.left}%`,
            width: image.size ? `${image.size.width}%` : 'auto',
            height: image.size?.height ? `${image.size.height}%` : 'auto',
          }}
        />
      ))}

        {overlayItems && overlayItems.map((item) => {
          if (!item) return;
          return <div
            key={item.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${item.className || ''}`}
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
            }}
          >
            {item.component}
          </div>
        })}
    </div>
  );
};
