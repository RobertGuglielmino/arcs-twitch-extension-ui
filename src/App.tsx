// import { useState } from 'react'
import type { GameData } from './components/enums/GameData';
import GameInfoTab from './components/gameInfo/GameInfoTab';
import PlayerSidebar from './components/player/PlayerSidebar';
import { useGameData } from './hooks/useGameData';

function App() {
  const data: GameData = useGameData();

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
