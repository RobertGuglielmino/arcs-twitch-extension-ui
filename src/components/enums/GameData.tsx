import type { Fates } from "./Fates"
import type { RESOURCES } from "./Resources"
import type { TITLES } from "./Titles"

export interface GameData {
    playerData: PlayerData,
    gameData: GeneralData
}

export interface PlayerData {
    name: string[],
    fate: Fates[],
    color: string[],
    power: number[],
    objectiveProgress: number[],
    resources: RESOURCES[][],
    outrage: boolean[][],
    courtCards: string[][],
    supply: {
        cities: number[],
        starports: number[],
        ships: number[],
        agents: number[],
        favors: number[][]
    },
    ambitionProgress: {
        tycoon: number[],
        tyrant: number[],
        warlord: number[],
        keeper: number[],
        empath: number[]
    },
    titles: TITLES[][]
}

export interface GeneralData {
    isCampaign: boolean,
    ambitionDeclarations: string[],
    courtCards: CourtCard[],
    laws: string[],
}

export interface CourtCard {
    id: string,
    agents: number[]
}


interface Supply {
    cities: number,
    spaceports: number,
    ships: number,
    agents: number,
    favors: number[]
}


// GAME DATA TO MOVE TO TTPG

/*
from ttpg
{
  "campaign": true,
  "players": [
    {
      "color": "FFB700",
      "initiative": true,
      "power": 0,
      "resources": [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      "outrage": [],
      "cities": 5,
      "spaceports": 5,
      "ships": 15,
      "agents": 10,
      "cards": [
        "Magnate"
      ],
      "court": [],
      "objective": 14,
      "titles": [
        "Imperial Regent"
      ]
    },
    {
      "color": "0095A9",
      "initiative": false,
      "power": 0,
      "resources": [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      "outrage": [],
      "cities": 5,
      "spaceports": 5,
      "ships": 15,
      "agents": 10,
      "cards": [
        "Caretaker"
      ],
      "court": [],
      "objective": 10,
      "titles": [
        "Imperial Regent"
      ]
    },
    {
      "color": "D7D2CB",
      "initiative": false,
      "power": 0,
      "resources": [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      "outrage": [],
      "cities": 5,
      "spaceports": 5,
      "ships": 15,
      "agents": 10,
      "cards": [
        "Believer"
      ],
      "court": [],
      "objective": 13,
      "titles": [
        "Imperial Regent"
      ]
    },
    {
      "name": "BlueChell",
      "color": "E1533D",
      "initiative": false,
      "power": 0,
      "resources": [
        "psionic",
        null,
        null,
        null,
        null,
        null
      ],
      "outrage": [],
      "cities": 5,
      "spaceports": 5,
      "ships": 15,
      "agents": 10,
      "cards": [],
      "court": [],
      "objective": 18,
      "titles": [
        "Imperial Regent"
      ]
    }
  ],
  "ambitions": [],
  "court": [
    {
      "id": "Imperial Council in Session",
      "influence": [
        0,
        0,
        0,
        0
      ]
    },
    {
      "id": "Gatekeepers",
      "influence": [
        0,
        0,
        0,
        0
      ]
    },
    {
      "id": "Shipping Interest",
      "influence": [
        0,
        0,
        0,
        0
      ]
    },
    {
      "id": "Council Intrigue",
      "influence": [
        0,
        0,
        0,
        0
      ]
    },
    {
      "id": "Diplomatic Fiasco",
      "influence": [
        0,
        0,
        0,
        0
      ]
    }
  ],
  "discard": [],
  "edicts": [
    "Govern the Imperial Reach"
  ],
  "laws": []
}
*/

export interface GameDataTTPG {
    players: PlayerTTPG[],
    gameData: {
        ambitionDeclarations: string[][],
        court: CourtCard[],
        laws: string[]
    }
}

interface PlayerTTPG {
    names: string,
    fates?: string,
    color: string,
    score: string,
    objectiveProgress?: number,
    resources: string[],
    supply: Supply,
    courtCards: string[],
    ambitionProgress: number[],
    titles?: string[]
}
