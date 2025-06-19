import { GAME_IMAGES } from "@/assets/game";
import Resource from "@/components/generic/resources/Resource";

interface BoardTokenGridProps {
    resources: string[],
    cities: number
    trophies: number, // object? for different types. ouch.
    captives: number,
    outrage: boolean[],
    favors: {
        color: string,
        value: number
    }[]
}

export default function BoardTokenGrid({ resources, cities, trophies, captives, outrage, favors }: BoardTokenGridProps) {

    // this doesn't do any validation for the resource table - but i assume this will happen somewhere else. otherwise it is a pain. thank you.
    return (<div className="flex flex-col">
        <div className="grid grid-cols-4">
            <div className="col-span-1 items-center grid grid-cols-2">
                {resources[0] && <Resource resourceType={resources[0]} />}

                {resources[1] && <Resource resourceType={resources[1]} />}
            </div>
            <div className="col-span-1  grid grid-cols-2 items-center">
                {resources[2] && <Resource resourceType={resources[2]} />}
                {cities >= 5 && <img src={GAME_IMAGES.city_free} />}

                {resources[3] && <Resource resourceType={resources[3]} />}
                {cities >= 4 && <img src={GAME_IMAGES.city_free} />}
            </div>
            <div className={`col-span-1 ${cities >=3 ? "grid-cols-1" : "grid grid-cols-2"}  items-center`}>
                {resources[4] && <Resource resourceType={resources[4]} />}

                {resources[5] && <Resource resourceType={resources[5]} />}

                {cities >= 3 && <img src={GAME_IMAGES.city_free} />}
            </div>
            <div className="col-span-1  grid grid-cols-2 items-center">
                {cities >= 2 && <img src={GAME_IMAGES.city_free} />}

                {cities >= 1 && <img src={GAME_IMAGES.city_free} />}
            </div>
        </div>
        <div className="flex flex-row justify-around">
            <div className="grid grid-rows-3">
                {favors.map(favor => <div key={favor.color} className={`${favor.color} font-body text-xl bg-white`}>{favor.value}</div>)}
            </div>
            <div className="grid grid-rows-5 my-5">
                {outrage.map((spot, i) => <div key={i} className="font-body text-xl bg-blue-500 rounded m-1">{spot ? "X" : "O"}</div>)}
            </div>
            <div className="font-body text-xl bg-white">
                {trophies}
            </div>
            <div className="font-body text-xl bg-white">
                {captives}
            </div>
        </div>
    </div>);
}