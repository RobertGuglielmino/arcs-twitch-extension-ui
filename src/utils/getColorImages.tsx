import { Color } from "@robertguglielmino/arcs-types"
    
export function getColorImages(color: Color, imgSrc: (s: string) => string) {
    switch (color) {
        case Color.Blue:
            return {
                city: imgSrc("city_blue"),
                starport: imgSrc("starport_blue")
            }
        case Color.Red:
            return {
                city: imgSrc("city_red"),
                starport: imgSrc("starport_red")
            }
        case Color.Yellow:
            return {
                city: imgSrc("city_yellow"),
                starport: imgSrc("starport_yellow")
            }
        case Color.White:
            return {
                city: imgSrc("city_white"),
                starport: imgSrc("starport_white")
            }
        default:
            return {
                city: imgSrc("city_free"),
                starport: imgSrc("starport_free")
            }
    }
}