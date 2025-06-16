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
