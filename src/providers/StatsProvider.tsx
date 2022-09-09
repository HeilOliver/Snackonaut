import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsContext } from "./SettingsProvider";
import Stats from "./StatsType";

const statsKey = "stats";

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
    const { settings } = useContext(SettingsContext);

    const [statsLoaded, setStatsLoaded] = useState(false);

    useEffect(() => {
        if (statsLoaded) {
            const saveStats = async () => {
                await AsyncStorage.setItem(statsKey, JSON.stringify(stats));
            };
            saveStats();
        }
    }, [stats]);

    useEffect(() => {
        const loadStats = async () => {
            const storedStats = await AsyncStorage.getItem(statsKey);

            if (storedStats) {
                setStats(JSON.parse(storedStats));
            }

            setStatsLoaded(true);
        };

        loadStats();
    }, []);

    const setSaturation = (saturation: Stats["saturation"]) => {
        setStats({ ...stats, saturation: clampStat(saturation) });
    };

    const setHydration = (hydration: Stats["hydration"]) => {
        setStats({ ...stats, hydration: clampStat(hydration) });
    };

    const setEnergy = (energy: Stats["energy"]) => {
        setStats({ ...stats, energy: clampStat(energy) });
    };

    useEffect(() => {
        let interval: NodeJS.Timer | undefined;

        if (settings.debugMode) {
            interval = setInterval(() => {
                const random = Math.random();
                if (random < 0.33) {
                    setSaturation(stats.saturation - 10);
                } else if (random < 0.66) {
                    setHydration(stats.hydration - 10);
                } else {
                    setEnergy(stats.energy - 10);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [stats, settings]);

    const contextValues = { stats, setSaturation, setHydration, setEnergy };

    return (
        <StatsContext.Provider value={contextValues}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsProvider;
