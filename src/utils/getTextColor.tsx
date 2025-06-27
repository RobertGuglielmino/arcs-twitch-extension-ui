export function getTextColor(color: string) {
    switch (color) {
        case "yellow":
            return "text-player-yellow"
        case "red":
            return "text-player-red"
        case "blue":
            return "text-player-blue"
        case "white":
            return "text-player-white"
        default:
            return "text-white"
    }
}
