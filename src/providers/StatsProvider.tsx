import React, { useContext, useState } from "react";

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

const StatsProvider: React.FC = ({ children }) => {
    const [stats, setStats] = useState<Stats>({
        saturation: 100,
        energy: 100,
        hydration: 100,
    });

    const setSaturation = (saturation: Stats["saturation"]) => {
        setStats({ ...stats, saturation });
    };

    const setHydration = (hydration: Stats["hydration"]) => {
        setStats({ ...stats, hydration });
    };

    const setEnergy = (energy: Stats["energy"]) => {
        setStats({ ...stats, energy });
    };

    const contextValues = { stats, setSaturation, setHydration, setEnergy };

    return (
        <StatsContext.Provider value={contextValues}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsProvider;
