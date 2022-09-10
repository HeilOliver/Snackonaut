import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsContext } from "./SettingsProvider";
import Stats, { dailyCOnsumption, maxValues, minValues } from "./StatsType";
import calculateNewStats, { offlineProgression } from "../services/gameLogic";

const statsKey = "stats";

interface StatsContextValues {
    stats: Stats;
    setHealth: (saturation: Stats["health"]) => void;
    setWeight: (saturation: Stats["weight"]) => void;
    setEnergy: (saturation: Stats["energy"]) => void;
    setName: (name: Stats["name"]) => void;
}

const defaultStats: Stats = {
    health: 90,
    weight: 75,
    energy: 1000,
    lastUpdate: Date.now(),
    name: "Snackonaut",
};

const initialContextValues: StatsContextValues = {
    stats: defaultStats,
    setHealth: () => {},
    setWeight: () => {},
    setEnergy: () => {},
    setName: () => {},
};

export const StatsContext =
    React.createContext<StatsContextValues>(initialContextValues);

const clampStat = (value: number, max: number, min: number) => {
    if (value > max) {
        return max;
    } else if (value < min) {
        return min;
    }

    return value;
};

const applyStatsFallback = (stats: Stats): Stats => ({
    energy: stats.energy ?? defaultStats.energy,
    weight: stats.weight ?? defaultStats.weight,
    lastUpdate: stats.lastUpdate ?? defaultStats.lastUpdate,
    name: stats.name ?? defaultStats.name,
    health: stats.health ?? defaultStats.health,
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
                    energy: clampStat(
                        fallbackStats.energy,
                        maxValues.energy,
                        minValues.energy
                    ),
                    health: clampStat(
                        fallbackStats.health,
                        maxValues.health,
                        minValues.health
                    ),
                    weight: clampStat(
                        fallbackStats.weight,
                        maxValues.weight,
                        minValues.weight
                    ),
                };

                setStats(clampedStats);
            }

            setStatsLoaded(true);
        };

        loadStats();
    }, []);

    const setHealth = (health: Stats["health"]) => {
        setStats({
            ...stats,
            health: clampStat(health, maxValues.health, minValues.health),
            lastUpdate: Date.now(),
        });
    };

    const setWeight = (weight: Stats["weight"]) => {
        setStats({
            ...stats,
            weight: clampStat(weight, maxValues.weight, minValues.weight),
            lastUpdate: Date.now(),
        });
    };

    const setEnergy = (energy: Stats["energy"]) => {
        setStats({
            ...stats,
            energy: clampStat(energy, maxValues.energy, minValues.energy),
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
                    weight: clampStat(
                        newStats.weight,
                        maxValues.weight,
                        minValues.weight
                    ),
                    health: clampStat(
                        newStats.health,
                        maxValues.health,
                        minValues.health
                    ),
                    energy: clampStat(
                        newStats.energy,
                        maxValues.energy,
                        minValues.energy
                    ),
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
        setHealth,
        setWeight,
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
