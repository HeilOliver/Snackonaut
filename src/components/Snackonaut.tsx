import {useContext} from "react";
import {StatsContext, Stats} from "../providers/StatsProvider";
import SvgMonster from "./svg/Monster";


const emotionSum = (stats: Stats) => {
    return Object.values(stats).reduce((a, b) => a + b, 0);
}

const Snackonout = () => {
    const {stats} = useContext(StatsContext);
    const emotion = emotionSum(stats);

    switch(emotion) {
        default:
            return <SvgMonster/>

    }
}

export default Snackonout;
