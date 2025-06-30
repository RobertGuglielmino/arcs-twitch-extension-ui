import type { GameData } from '@robertguglielmino/arcs-types';
import GameInfoTab from './components/gameInfo/GameInfoTab';
import PlayerSidebar from './components/player/PlayerSidebar';
import { useGameData } from './hooks/useGameData';

import { initializeImageStore } from './stores/imageStore';
import { APP_IMAGES } from './assets/app';
import { GAME_IMAGES } from './assets/game';
import { CAMPAIGN_IMAGES } from './assets/campaign';
import { COURT_IMAGES } from './assets/campaign/court';
import { EDICT_IMAGES } from './assets/campaign/edicts';
import { LAW_IMAGES } from './assets/campaign/laws';
import { FATES_IMAGES } from './assets/campaign/fates';

// In your App component (add this once):
const imageConfig = { APP_IMAGES, GAME_IMAGES, CAMPAIGN_IMAGES, COURT_IMAGES, EDICT_IMAGES, LAW_IMAGES, FATES_IMAGES };
initializeImageStore(imageConfig);

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