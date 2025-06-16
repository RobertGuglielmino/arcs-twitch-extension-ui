import { TITLES } from "../../enums/Titles";

interface PlayerTitleChipProps {
    title: string
}


export default function PlayerTitleChip({ title }: PlayerTitleChipProps) {

    return (<div className={`${getBGColor(title)} border-2 rounded border-amber-400 text-white text-xs font-body p-1 line-clamp-2`}> 
        {title}
    </div>);
}

function getBGColor(title: string) {
    switch (title) {
        case TITLES.ImperialRegent:
            return 'bg-empire'
        case TITLES.FirstRegent:
            return 'bg-empire'
        case TITLES.Outlaw:
            return 'bg-outlaw'
        case TITLES.CommonwealthFounder:
            return 'bg-commonwealth'
        case TITLES.CommonwealthMember:
            return 'bg-commonwealthmember'
        case TITLES.LordCluster1:
            return 'bg-lord'
        case TITLES.LordCluster2:
            return 'bg-lord'
        case TITLES.LordCluster3:
            return 'bg-lord'
        case TITLES.LordCluster4:
            return 'bg-lord'
        case TITLES.LordCluster5:
            return 'bg-lord'
        case TITLES.LordCluster6:
            return 'bg-lord'
        case TITLES.JudgesChosen:
            return 'bg-judge'
        default:
            return 'bg-white'
            
    }
}