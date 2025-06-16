import { Color } from "../enums/Colors";

interface PlayerProgressMarkerProps {
  color: Color;
  children: React.ReactNode;
}

function PlayerProgressMarker({ color, children }: PlayerProgressMarkerProps) {

    function getColor(color: Color) {
        switch (color) {
            case Color.Red:
                return "bg-red-500";
            case Color.Yellow:
                return "bg-yellow-500";
            case Color.White:
                return "bg-white";
            case Color.Blue:
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    }


  return <div className={`flex text-center p-2 ${getColor(color)}`}>{children}</div>;
}

export default PlayerProgressMarker;
