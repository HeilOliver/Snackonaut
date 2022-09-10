import { useContext } from "react";
import { StatsContext } from "../providers/StatsProvider";
import SvgMonster from "./svg/Monster";
import SvgDead from "./svg/Dead";
import SvgSick from "./svg/Sick";

const Snackonaut = () => {
    const { stats } = useContext(StatsContext);

    if(stats.health <= 0) {
        return <SvgDead/>
    } if(stats.health < 20) {
        return <SvgSick/>
    } else {
        return <SvgMonster />;
    }
};

export default Snackonaut;
