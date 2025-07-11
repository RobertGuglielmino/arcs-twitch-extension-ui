
import { PositionedImages, type PositionedImage } from "@/components/generic/PositionedImages";
import { Color } from "@robertguglielmino/arcs-types";
import { getColor } from "@/utils/getColor";
import type { RESOURCES } from "@robertguglielmino/arcs-types";

interface PlayerBoardDisplayProps {
  playerBoard: string,
  cityConfig: any,
  resourceConfig: any,
  resources: RESOURCES[],
  cities: number,
  outrage: boolean[],
  trophies: number,
  captives: number,
  color: Color
}

export default function PlayerBoardDisplay({ playerBoard, cityConfig, resourceConfig, resources, cities, outrage, trophies, captives, color }: PlayerBoardDisplayProps) {

  function generateResourcesImages(resourcesInput: RESOURCES[]): any[] {
    return resourcesInput
      .map((resourcesType, index) => {
        if (!resourcesType || index >= resourceConfig.positions.length) return null;

        return {
          id: `resource-${index}`,
          src: resourceConfig.images[resourcesType as keyof typeof resourceConfig.images],
          alt: `Resource ${resourcesType} at position ${index + 1}`,
          position: resourceConfig.positions[index],
          size: resourceConfig.size,
        };
      })
      .filter((item): item is any => item !== null);
  }

  function generateCityImages(cityCount: number): PositionedImage[] {
    const clampedCount = Math.max(0, Math.min(5, cityCount));

    return Array.from({ length: clampedCount }, (_, index) => ({
      id: `city-${index}`,
      src: cityConfig.image,
      alt: `City ${index + 1}`,
      position: cityConfig.positions[index],
      size: cityConfig.size,
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
