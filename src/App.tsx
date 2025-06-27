// import { useState } from 'react'
import type { GameData } from '@robertguglielmino/arcs-types';
import GameInfoTab from './components/gameInfo/GameInfoTab';
import PlayerSidebar from './components/player/PlayerSidebar';
import { useGameData } from './hooks/useGameData';

function App() {
  const data: GameData = useGameData();

  /* 
  
      fate: Fates[];
    courtCards: string[][];
            courtCards: CourtCard[];
            edicts: string[];
            laws: string[];
  */

  return (
    <>
      <div className="h-screen w-full">
        <GameInfoTab data={data.gameData}/>
        <PlayerSidebar data={data.playerData}/>
      </div>
    </>
  )
}

export default App  
