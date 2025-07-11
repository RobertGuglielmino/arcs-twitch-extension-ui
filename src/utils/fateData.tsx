const FateIDToName = {
    // A Fates
    'ARCS_FATE01': 'Steward',
    'ARCS_FATE02': 'Founder',
    'ARCS_FATE03': 'Magnate',
    'ARCS_FATE04': 'Advocate',
    'ARCS_FATE05': 'Caretaker',
    'ARCS_FATE06': 'Partisan',
    'ARCS_FATE07': 'Admiral',
    'ARCS_FATE08': 'Believer',
    
    // B Fates
    'ARCS_FATE09': 'Pathfinder',
    'ARCS_FATE10': 'Hegemon',
    'ARCS_FATE11': 'Planetbreaker',
    'ARCS_FATE12': 'Pirate',
    'ARCS_FATE13': 'Blightspeaker',
    'ARCS_FATE14': 'Pacifist',
    'ARCS_FATE15': 'Peacekeeper',
    'ARCS_FATE16': 'Warden',
    
    // C Fates
    'ARCS_FATE17': 'Overlord',
    'ARCS_FATE18': 'Survivalist',
    'ARCS_FATE19': 'Redeemer',
    'ARCS_FATE20': 'Guardian',
    'ARCS_FATE21': 'Naturalist',
    'ARCS_FATE22': 'Gatewraith',
    'ARCS_FATE23': 'Conspirator',
    'ARCS_FATE24': 'Judge'
} as const;

const FateNameToID = {
    // A Fates
    'Steward': 'ARCS_FATE01',
    'Founder': 'ARCS_FATE02',
    'Magnate': 'ARCS_FATE03',
    'Advocate': 'ARCS_FATE04',
    'Caretaker': 'ARCS_FATE05',
    'Partisan': 'ARCS_FATE06',
    'Admiral': 'ARCS_FATE07',
    'Believer': 'ARCS_FATE08',
    
    // B Fates
    'Pathfinder': 'ARCS_FATE09',
    'Hegemon': 'ARCS_FATE10',
    'Planetbreaker': 'ARCS_FATE11',
    'Pirate': 'ARCS_FATE12',
    'Blightspeaker': 'ARCS_FATE13',
    'Pacifist': 'ARCS_FATE14',
    'Peacekeeper': 'ARCS_FATE15',
    'Warden': 'ARCS_FATE16',
    
    // C Fates
    'Overlord': 'ARCS_FATE17',
    'Survivalist': 'ARCS_FATE18',
    'Redeemer': 'ARCS_FATE19',
    'Guardian': 'ARCS_FATE20',
    'Naturalist': 'ARCS_FATE21',
    'Gatewraith': 'ARCS_FATE22',
    'Conspirator': 'ARCS_FATE23',
    'Judge': 'ARCS_FATE24',
} as const;


export function fateIdToName(name: keyof typeof FateIDToName) {
    if (!Object.keys(FateIDToName).includes(name)) return "";
    
    return FateIDToName[name];
}

export function fateNameToId(name: keyof typeof FateNameToID) {
    if (!Object.keys(FateNameToID).includes(name)) return "";
    
    return FateNameToID[name];
}

