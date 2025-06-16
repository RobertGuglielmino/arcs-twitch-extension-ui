import playerBoard from "/src/assets/game/board.webp"
import { GAME_IMAGES } from "@/assets/game";
import { PositionedImages, type PositionedImage } from "@/components/generic/PositionedImages";
import { Color } from "@/components/enums/Colors";
import type { RESOURCES } from "@/components/enums/Resources";


interface PlayerBoardDisplayProps {
  resources: RESOURCES[],
  cities: number,
  color: Color
}

export default function PlayerBoardDisplay({ resources, cities, color }: PlayerBoardDisplayProps) {

  const RESOURCE_CONFIG = {
    positions: [
      { top: 25, left: 9.6 },
      { top: 25, left: 21.25 },
      { top: 25, left: 32.9 },
      { top: 25, left: 44.55 },
      { top: 25, left: 56.2 },
      { top: 25, left: 67.85 }
    ],
    size: { width: 11 },
    images: {
      "material": GAME_IMAGES.material,
      "fuel": GAME_IMAGES.fuel,
      "weapons": GAME_IMAGES.weapons,
      "relic": GAME_IMAGES.relic,
      "psionics": GAME_IMAGES.psionics,
    }
  };

  const CITY_CONFIG = {
    positions: [
      { top: 22.5, left: 91 },
      { top: 22.5, left: 79.4 },
      { top: 22.5, left: 61.9 },
      { top: 22.5, left: 44.5 },
      { top: 22.5, left: 33 }
    ],
    size: { width: 9 },
    image: getColorImages(color)
  };

  function generateResourcesImages(resourcesInput: RESOURCES[]): any[] {
    return resourcesInput
      .map((resourcesType, index) => {
        if (!resourcesType || index >= RESOURCE_CONFIG.positions.length) return null;

        return {
          id: `resource-${index}`,
          src: RESOURCE_CONFIG.images[resourcesType as keyof typeof RESOURCE_CONFIG.images],
          alt: `Resource ${resourcesType} at position ${index + 1}`,
          position: RESOURCE_CONFIG.positions[index],
          size: RESOURCE_CONFIG.size,
        };
      })
      .filter((item): item is any => item !== null);
  }

  // Generate city images based on count (0-5, fills right to left)
  function generateCityImages(cityCount: number): PositionedImage[] {
    const clampedCount = Math.max(0, Math.min(5, cityCount));

    return Array.from({ length: clampedCount }, (_, index) => ({
      id: `city-${index}`,
      src: CITY_CONFIG.image,
      alt: `City ${index + 1}`,
      position: CITY_CONFIG.positions[index],
      size: CITY_CONFIG.size,
    }));
  }

  // function generateOtherImages() {

  // }

  // Main function to combine both image types
  function generateAllImages(): PositionedImage[] {
    const fuelImages = generateResourcesImages(resources);
    const cityImages = generateCityImages(cities);
    // const otherImages = generateOtherImages();

    return [...fuelImages, ...cityImages];
  }


  const foregroundImages = generateAllImages();

  return (<PositionedImages
    backgroundImage={playerBoard}
    backgroundAlt="playerBoard"
    foregroundImages={foregroundImages}></PositionedImages>);
}



function getColorImages(color: Color) {
  switch (color) {
    case Color.Blue:
      return GAME_IMAGES.city_blue;
    case Color.Red:
      return GAME_IMAGES.city_red;
    case Color.Yellow:
      return GAME_IMAGES.city_yellow;
    case Color.White:
      return GAME_IMAGES.city_white;
    default:
      return GAME_IMAGES.city_free;
  }
}