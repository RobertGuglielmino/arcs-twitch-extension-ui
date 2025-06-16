import type { Color } from "../enums/Colors";
import PlayerProgressMarker from "./PlayerProgressMarker";

interface Agent {
    color: Color;
    value: number;
}

interface CourtCardProps {
    agents: Agent[];
    courtImg: string;
}

function CourtCard({agents, courtImg}: CourtCardProps) {
    return (<div className="flex flex-col">
        <img 
            src={courtImg}
        />
        <div className="flex flex-row gap-1 m-1">
            {agents.map(agent => <PlayerProgressMarker color={agent.color}>{agent.value}</PlayerProgressMarker>)}
        </div>
    </div>)
}

export default CourtCard;