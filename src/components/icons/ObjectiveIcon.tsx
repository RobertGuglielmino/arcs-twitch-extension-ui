interface ObjectiveIconProps {
    objectiveScore: number
}

export default function ObjectiveIcon({ objectiveScore }: ObjectiveIconProps) {

    return (<div className="flex flex-col">
        <div className="flex items-center justify-center text-2xl -mt-1">
            {objectiveScore}
        </div>
        <div className="flex items-center justify-center font-body text-xs -mt-1">
            OBJ.
        </div>
    </div>);
}