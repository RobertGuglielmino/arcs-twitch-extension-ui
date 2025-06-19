export function getColor(color: string) {
    switch (color) {
        case "yellow":
            return "bg-player-yellow"
        case "red":
            return "bg-player-red"
        case "blue":
            return "bg-player-blue"
        case "white":
            return "bg-player-white"
        default:
            return "bg-white"
    }
}