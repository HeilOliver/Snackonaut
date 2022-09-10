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
    setName: (name: Stats["name"]) => void;
}

const defaultStats: Stats = {
    saturation: 50,
    hydration: 50,
    energy: 50,
    lastUpdate: Date.now(),
    name: "Snackonaut",
};

const initialContextValues: StatsContextValues = {
    stats: defaultStats,
    setSaturation: () => {},
    setHydration: () => {},
    setEnergy: () => {},
    setName: () => {},
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

const applyStatsFallback = (stats: Stats): Stats => ({
    energy: stats.energy ?? defaultStats.energy,
    hydration: stats.hydration ?? defaultStats.hydration,
    lastUpdate: stats.lastUpdate ?? defaultStats.lastUpdate,
    name: stats.name ?? defaultStats.name,
    saturation: stats.saturation ?? defaultStats.saturation,
});

const StatsProvider: React.FC = ({ children }) => {
    const [stats, setStats] = useState<Stats>(defaultStats);
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
                const fallbackStats = applyStatsFallback(updatedStats);

                const clampedStats: Stats = {
                    ...fallbackStats,
                    energy: clampStat(fallbackStats.energy),
                    hydration: clampStat(fallbackStats.hydration),
                    saturation: clampStat(fallbackStats.saturation),
                };

                setStats(clampedStats);
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
    const setName = (name: Stats["name"]) => {
        setStats({
            ...stats,
            name,
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
                    name: newStats.name,
                });
            },
            settings.debugMode ? 1000 : 1000 * 60
        );

        return () => clearInterval(gameInterval);
    }, [stats, settings]);

    const contextValues = {
        stats,
        setSaturation,
        setHydration,
        setEnergy,
        setName,
    };

    return (
        <StatsContext.Provider value={contextValues}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsProvider;
