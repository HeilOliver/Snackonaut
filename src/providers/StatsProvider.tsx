import React, { useCallback, useContext, useState } from "react";

interface Stats {
    saturation: number;
    hydration: number;
    energy: number;
}

interface StatsContextValues {
    stats: Stats;
    setSaturation: (saturation: Stats["saturation"]) => void;
    setHydration: (saturation: Stats["hydration"]) => void;
    setEnergy: (saturation: Stats["energy"]) => void;
}

const initialContextValues: StatsContextValues = {
    stats: {
        saturation: 50,
        hydration: 50,
        energy: 50,
    },
    setSaturation: () => {},
    setHydration: () => {},
    setEnergy: () => {},
};

export const StatsContext =
    React.createContext<StatsContextValues>(initialContextValues);

const clampStat = (
    value: Stats["saturation"] | Stats["hydration"] | Stats["energy"]
) => {
    if (value > 100) {
        return 100;
    } else if (value < 0) {
        return 0;
    }

    return value;
};

const StatsProvider: React.FC = ({ children }) => {
    const [stats, setStats] = useState<Stats>({
        saturation: 50,
        energy: 50,
        hydration: 50,
    });

    const setSaturation = useCallback(
        (saturation: Stats["saturation"]) => {
            setStats({ ...stats, saturation: clampStat(saturation) });
        },
        [stats]
    );

    const setHydration = useCallback(
        (hydration: Stats["hydration"]) => {
            setStats({ ...stats, hydration: clampStat(hydration) });
        },
        [stats]
    );

    const setEnergy = useCallback(
        (energy: Stats["energy"]) => {
            setStats({ ...stats, energy: clampStat(energy) });
        },
        [stats]
    );

    const contextValues = { stats, setSaturation, setHydration, setEnergy };

    return (
        <StatsContext.Provider value={contextValues}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsProvider;
