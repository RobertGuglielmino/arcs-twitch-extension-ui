
import { AMBITION_MARKERS, Fates, RESOURCES, TITLES, type GameData } from "@robertguglielmino/arcs-types";
import { useEffect, useState } from "react";
import { useImagePreloader } from "@/stores/imageStore";
import { Color } from "@robertguglielmino/arcs-types";
import { useTwitchPubSub } from "./useTwitchPubSub";


function extractImagesFromGameData(data: GameData) {
  let fatesImages: string[] = [];
  const appImages: string[] = [];
  const campaignImages: string[] = [];
  const courtImages: string[] = [];

  let edictImages: string[] = [];
  const gameImages: string[] = [];
  const lawImages: string[] = [];
  

  // APP IMAGES
  appImages.push('background');
  
  // FATES IMAGES
  fatesImages = data.playerData.fate;

  // CAMPAIGN IMAGES
  const campaignImagesToAdd = [
    "flagshipBoard",
    "firstRegent",
    "flagship"
  ]
  campaignImagesToAdd.forEach(str => campaignImages.push(str));

  // COURT IMAGES
  data.playerData.courtCards.forEach(playerCards => {
    playerCards.forEach(cardId => {
      if (cardId) courtImages.push(cardId);
    });
  });

  // EDICT IMAGES
  edictImages = data.gameData.edicts;

  // data.gameData.courtCards.forEach(courtCard => {
  //   if (courtCard.id) courtImages.push(`court_card_${courtCard.id}`);
  // });






  // GAMES IMAGES
  const gameImagesToAdd = [
    "action",
    "ambition_back",
    "ambition",
    "board",

    RESOURCES.Material,
    RESOURCES.Fuel,
    RESOURCES.Weapons,
    RESOURCES.Relic,
    RESOURCES.Psionics,

    "starport_free",
    "city_free",
    
    "empath",
    "keeper",
    "tycoon",
    "tyrant",
    "warlord",
    "blightkin",
    "edenguard",
    
    "firstGold",
    "firstSilver",
    "secondGold",
    "secondSilver",
    "thirdGold",
    "thirdSilver",
    
    "cardBack",
    "cardBackSideways",
  ];

  gameImagesToAdd.forEach(str => gameImages.push(str));
  
  data.playerData.color.forEach(color => {
    if (color) {
      gameImages.push(`city_${color}`);
      gameImages.push(`starport_${color}`);
    }
  });


  // LAW IMAGES
  data.gameData.laws.forEach(law => {
    if (law && law !== "") lawImages.push(law);
  });

  return {
    gameAssets: [...new Set(gameImages)], 
    appAssets: [...new Set(appImages)],
    campaignAssets: [...new Set(campaignImages)],
    courtAssets: [...new Set(courtImages)],
    fateAssets: [...new Set(fatesImages)],
    edictAssets: [...new Set(edictImages)],
    lawAssets: [...new Set(lawImages)],
  };
}

const mockData: GameData = {
    playerData: {
        name: ["ROB", "MATT", "HUNTER", "DARRELL"],
        fate: [Fates.Steward, Fates.Admiral, Fates.Pathfinder, Fates.Conspirator],
        color: ["white", "blue", "red", "yellow"],
        power: [11, 2, 3, 40],
        objectiveProgress: [1, 21, 3, 4],
        resources: [
            [RESOURCES.Fuel, RESOURCES.Empty, RESOURCES.Fuel, RESOURCES.Empty, RESOURCES.Fuel, RESOURCES.Empty],
            [RESOURCES.Relic, RESOURCES.Material, RESOURCES.Weapons, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Psionics, RESOURCES.Psionics, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Relic, RESOURCES.Fuel, RESOURCES.Empty, RESOURCES.Relic, RESOURCES.Material],
        ],
        supply: { agents: [3, 3, 3, 3], ships: [4, 4, 4, 4], cities: [2, 4, 2, 2], starports: [5, 5, 5, 5], favors: [] },
        outrage: [[true, false, false, true, false], [false, true, true, true, false], [true, false, true, false, true], [false, false, false, false, true], [false, false, false, false, false]],
        courtCards: [
            ["ARCS_F0102", "ARCS_F0103", "ARCS_F0105", "ARCS_F0106", "ARCS_F0107"],
            ["ARCS_F0502", "ARCS_F0503", "ARCS_F0504"],
            ["ARCS_F0602", "ARCS_F0605", "ARCS_F0606", "ARCS_F0607", "ARCS_F0608", "ARCS_F0609", "ARCS_F0610", "ARCS_F0611", "ARCS_F0612", "ARCS_F0613", "ARCS_F0614", "ARCS_F0617", "ARCS_F0620", "ARCS_F0621", "ARCS_F0622", "ARCS_F0623", "ARCS_F0625"],
            []
        ],
        ambitionProgress: {
            tycoon: [0, 0, 0, 0, 0],
            tyrant: [0, 0, 0, 0, 0],
            warlord: [0, 0, 0, 0, 0],
            keeper: [0, 0, 0, 0, 0],
            empath: [0, 0, 0, 0, 0],
        },
        hasFlagship: [true, false, true, true],
        flagshipBoard: [
            ["city", "starport", "starport", "city", "city", "starport", "starport", "city", "city", "starport", "starport", "city"],
            ["city", "starport", "starport", "city", "city", "starport", "starport", "city", "city", "starport", "starport", "city"],
            ["city", "", "starport", "city", "", "", "starport", "", "city", "starport", "", "city"],
            ["", "", "", "", "", "", "", "", "", "", "", ""]
        ],
        titles: [
            [TITLES.FirstRegent, TITLES.LordCluster1],
            [TITLES.ImperialRegent, TITLES.CommonwealthMember],
            [TITLES.Outlaw, TITLES.CommonwealthFounder],
            [TITLES.Outlaw, TITLES.JudgesChosen]
        ]
    },
    gameData: {
        isCampaign: true,
        ambitionDeclarations: {
            tycoon: [AMBITION_MARKERS.FirstGold],
            tyrant: [],
            warlord: [AMBITION_MARKERS.SecondGold, AMBITION_MARKERS.ThirdSilver],
            keeper: [],
            empath: [],
            edenguard: [],
            blightkin: [],
        },
        hasBlightkin: false,
        hasEdenguard: false,
        ambitionPodium: {
            tycoon: [[1], [2]],
            tyrant: [[0], []],
            warlord: [[], [0, 1, 2]],
            keeper: [[1], [2]],
            empath: [[1], [2]],
        },
        courtCards: [
            { id: "ARCS_AID01A", agents: [{ color: Color.Red, value: 4 }, { color: Color.Yellow, value: 4 }, { color: Color.Blue, value: 4 }] },
            { id: "ARCS_F0105", agents: [{ color: Color.Red, value: 4 }] },
            { id: "ARCS_F0106", agents: [{ color: Color.Yellow, value: 3 }] },
            { id: "ARCS_F0107", agents: [{ color: Color.Blue, value: 2 }] },
            { id: "ARCS_F0107", agents: [{ color: Color.White, value: 1 }] }
        ],
        edicts: ["ARCS_AID03", "ARCS_F113", "ARCS_F215", "ARCS_F521"],
        laws: [""]
    }
}

export const initialData: GameData = {
    playerData: {
        name: ["", "", "", ""],
        fate: [Fates.Steward, Fates.Steward, Fates.Steward, Fates.Steward],
        color: ["white", "blue", "red", "yellow"],
        power: [0, 0, 0, 0],
        objectiveProgress: [0, 0, 0, 0],
        resources: [
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
            [RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty, RESOURCES.Empty],
        ],
        supply: { agents: [3, 3, 3, 3], ships: [4, 4, 4, 4], cities: [2, 2, 2, 2], starports: [5, 5, 5, 5], favors: [] },
        outrage: [[false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false]],
        courtCards: [
            [],
            [],
            [],
            []
        ],
        ambitionProgress: {
            tycoon: [0, 0, 0, 0, 0],
            tyrant: [0, 0, 0, 0, 0],
            warlord: [0, 0, 0, 0, 0],
            keeper: [0, 0, 0, 0, 0],
            empath: [0, 0, 0, 0, 0],
            
            blightkin: [0, 0, 0, 0, 0],
            edenguard: [0, 0, 0, 0, 0],
        },
        hasFlagship: [false, false, false, false],
        flagshipBoard: [
        ],
        titles: [
            [],
            [],
            [],
            [],
        ]
    },
    gameData: {
        isCampaign: true,
        hasBlightkin: false,
        hasEdenguard: false,
        ambitionPodium: {
            tycoon: [[], []],
            tyrant: [[], []],
            warlord: [[], []],
            keeper: [[], []],
            empath: [[], []],
        },
        ambitionDeclarations: {
            tycoon: [],
            tyrant: [],
            warlord: [],
            keeper: [],
            empath: [],
            edenguard: [],
            blightkin: [],
        },
        courtCards: [],
        edicts: [],
        laws: [""]
    }
}

export function useGameData() {
    const data = useTwitchPubSub(mockData);
    const [_, setIsPreloading] = useState(false);
    const { preloadFromData } = useImagePreloader();


    // Preload images when data changes
    useEffect(() => {
        async function preloadGameImages(gameData: GameData) {
            setIsPreloading(true);
            try {
                const imagesToPreload = extractImagesFromGameData(gameData);
                console.log("WERWERWER");
                await preloadFromData(imagesToPreload);
            } catch (error) {
                console.error('Failed to preload images:', error);
            } finally {
                setIsPreloading(false);
            }
        }

        // Preload images for the current data
        preloadGameImages(data);
    }, [data, preloadFromData]);

    return data;
}