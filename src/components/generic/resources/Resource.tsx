
import { GAME_IMAGES } from '@/assets/game';

interface ResourceType {
    resourceType: string;
}

export default function Resource({resourceType}: ResourceType) {


    return (<img 
        src={GAME_IMAGES["fuel"]}
        alt={resourceType.toString()}
        className="object-contain"
        />);
}