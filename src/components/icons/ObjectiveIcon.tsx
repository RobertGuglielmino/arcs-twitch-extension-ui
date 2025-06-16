interface ObjectiveIconProps {
    objectiveScore: number
}

export default function ObjectiveIcon({ objectiveScore }: ObjectiveIconProps) {

    return (<div className="flex flex-col gap-1">
        <div className="flex items-center justify-center text-5xl">
            {objectiveScore}
        </div>
        <div className="flex items-center justify-center font-body text-xs">
            OBJECTIVE
        </div>
    </div>);
}