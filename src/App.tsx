// import { useState } from 'react'
import type { GameData } from './components/enums/GameData';
import GameInfoTab from './components/gameInfo/GameInfoTab';
import PlayerTab from './components/player/PlayerTab';
import { useGameData } from './hooks/useGameData';

function App() {
  const data: GameData = useGameData();

  return (
    <>
      <div className="h-screen w-full">
        <GameInfoTab data={data.gameData}/>
        <PlayerTab data={data.playerData}/>
      </div>
    </>
  )
}

export default App  
