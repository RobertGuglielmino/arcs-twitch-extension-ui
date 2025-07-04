
import { PositionedImages, type PositionedImage } from "@/components/generic/PositionedImages";
import { Color } from "@robertguglielmino/arcs-types";
import { getColor } from "@/utils/getColor";
import { GAME_IMAGES } from "@/assets/game";
import { useImageBus } from "@/stores/imageStore";
import type { RESOURCES } from "@robertguglielmino/arcs-types";

interface PlayerBoardDisplayProps {
  playerBoard: string,
  resources: RESOURCES[],
  cities: number,
  outrage: boolean[],
  trophies: number,
  captives: number,
  color: Color
}

export default function PlayerBoardDisplay({ playerBoard, resources, cities, outrage, trophies, captives, color }: PlayerBoardDisplayProps) {
  const { getImageSrc: gameImages } = useImageBus("GAME_IMAGES");

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

  function generateOutrage(outrage: boolean[]): any[] {
    return outrage.map((isOutraged, index) => {
      if (!isOutraged) return overlayItems[index];
    });
  }

  function generateAllImages(): PositionedImage[] {
    const fuelImages = generateResourcesImages(resources);
    const cityImages = generateCityImages(cities);
    // const otherImages = generateOtherImages();

    return [...fuelImages, ...cityImages];
  }

  function generateValues(): any[] {
    return [
      {
        id: 'trophies',
        position: { x: 58, y: 68 },
        component: <div className="text-white font-header bg-stone-900 rounded p-6 text-5xl flex text-center">{trophies}</div>
      },
      {
        id: 'captives',
        position: { x: 85, y: 68 },
        component: <div className="text-white font-header bg-stone-900 rounded p-6 text-5xl flex text-center">{captives}</div>
      }
    ];
  }

  function generateAllComponents(): any[] {
    const outrageComponents = generateOutrage(outrage);
    const values = generateValues();

    return [...outrageComponents, ...values];
  }

  function getColorImages(color: Color) {
    switch (color) {
      case Color.Blue:
        return gameImages("city_blue");
      case Color.Red:
        return gameImages("city_red");
      case Color.Yellow:
        return gameImages("city_yellow");
      case Color.White:
        return gameImages("city_white");
      default:
        return gameImages("city_free");
    }
  }

  const bgColor = getColor(color);

  const overlayItems = [
    {
      id: 'outrage_material',
      position: { x: 23.5, y: 48 },
      component: <div className={`flex items-center ${bgColor} justify-center text-xs rounded w-6 h-4 m-1`}> </div>
    },
    {
      id: 'outrage_fuel',
      position: { x: 23.5, y: 58.5 },
      component: <div className={`flex items-center ${bgColor} justify-center text-xs rounded w-6 h-4 m-1`}> </div>
    },
    {
      id: 'outrage_weapons',
      position: { x: 23.5, y: 69 },
      component: <div className={`flex items-center ${bgColor} justify-center text-xs rounded w-6 h-4 m-1`}> </div>
    },
    {
      id: 'outrage_relic',
      position: { x: 23.5, y: 79.5 },
      component: <div className={`flex items-center ${bgColor} justify-center text-xs rounded w-6 h-4 m-1`}> </div>
    },
    {
      id: 'outrage_psionics',
      position: { x: 23.5, y: 90 },
      component: <div className={`flex items-center ${bgColor} justify-center text-xs rounded w-6 h-4 m-1`}> </div>
    },
    {
      id: 'nothing',
      position: { x: 0, y: 0 },
      component: <></>
    },
    {
      id: 'favors',
      position: { x: 23.5, y: 90 },
      component: <div className={`flex items-center ${bgColor} justify-center text-xs rounded w-6 h-4 m-1`}> </div>
    },
  ];

  const foregroundImages = generateAllImages();

  return (<PositionedImages
    backgroundImage={playerBoard}
    backgroundAlt="playerBoard"
    foregroundImages={foregroundImages}
    overlayItems={generateAllComponents()}></PositionedImages>);
}
