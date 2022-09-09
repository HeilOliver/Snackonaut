import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsContext } from "./SettingsProvider";
import Stats from "./StatsType";
import calculateNewStats, { offlineProgression } from "../services/gameLogic";

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
        lastUpdate: 0,
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
        lastUpdate: Date.now(),
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
                const loadedStats = JSON.parse(storedStats) as Stats;
                const updatedStats = offlineProgression(loadedStats);
                setStats(updatedStats);
            }

            setStatsLoaded(true);
        };

        loadStats();
    }, []);

    const setSaturation = (saturation: Stats["saturation"]) => {
        setStats({
            ...stats,
            saturation: clampStat(saturation),
            lastUpdate: Date.now(),
        });
    };

    const setHydration = (hydration: Stats["hydration"]) => {
        setStats({
            ...stats,
            hydration: clampStat(hydration),
            lastUpdate: Date.now(),
        });
    };

    const setEnergy = (energy: Stats["energy"]) => {
        setStats({
            ...stats,
            energy: clampStat(energy),
            lastUpdate: Date.now(),
        });
    };

    useEffect(() => {
        const gameInterval = setInterval(
            () => {
                const newStats = calculateNewStats(stats);
                setStats({
                    saturation: clampStat(newStats.saturation),
                    hydration: clampStat(newStats.hydration),
                    energy: clampStat(newStats.energy),
                    lastUpdate: newStats.lastUpdate,
                });
            },
            settings.debugMode ? 1000 : 1000 * 60
        );

        return () => clearInterval(gameInterval);
    }, [stats, settings]);

    const contextValues = { stats, setSaturation, setHydration, setEnergy };

    return (
        <StatsContext.Provider value={contextValues}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsProvider;
