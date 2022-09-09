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
        saturation: 100,
        hydration: 100,
        energy: 100,
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
        saturation: 100,
        energy: 100,
        hydration: 100,
    });

    const setSaturation = useCallback((saturation: Stats["saturation"]) => {
        setStats({ ...stats, saturation: clampStat(saturation) });
    }, []);

    const setHydration = useCallback((hydration: Stats["hydration"]) => {
        setStats({ ...stats, hydration: clampStat(hydration) });
    }, []);

    const setEnergy = useCallback((energy: Stats["energy"]) => {
        setStats({ ...stats, energy: clampStat(energy) });
    }, []);

    const contextValues = { stats, setSaturation, setHydration, setEnergy };

    return (
        <StatsContext.Provider value={contextValues}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsProvider;
