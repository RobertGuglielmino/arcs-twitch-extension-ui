import type { AMBITION_MARKERS } from "@robertguglielmino/arcs-types";

interface DeclaredAmbitionsProps {
    ambitionMarkers: AMBITION_MARKERS[];
}

function DeclaredAmbitions({ambitionMarkers}: DeclaredAmbitionsProps) {

    function getAmbition(ambition: AMBITION_MARKERS) {
        switch (ambition) {
            // case Ambitions.Material:
            //     return "/ambitions/ambition1.png";
            // case Ambitions.Ambition2:
            //     return "/ambitions/ambition2.png";
            // case Ambitions.Ambition3:
            //     return "/ambitions/ambition3.png";
            // case Ambitions.Ambition4:
            //     return "/ambitions/ambition4.png";
            // case Ambitions.Ambition5:
            default:
                return "/ambitions/ambition1.png";

        }
    }

    return (<div className="flex flew-row g-1 m-1">
        {ambitionMarkers.map(ambition => getAmbition(ambition)).map(ambition => <img src={ambition} />)}
    </div>)
}

export default DeclaredAmbitions;