import { getColor } from "@/utils/getColor";
import type { Color } from "@robertguglielmino/arcs-types";

interface PlayerProgressMarkerProps {
  color: Color;
  children: React.ReactNode;
}

function PlayerProgressMarker({ color, children }: PlayerProgressMarkerProps) {

  return <div className={`flex text-center p-2 ${getColor(color)}`}>{children}</div>;
}

export default PlayerProgressMarker;
