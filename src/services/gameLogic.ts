import Stats from "../providers/StatsType";

const calculateReduction = (energy: Stats["energy"]) => energy * -0.1 + 15;

const calculateNewStats = (stats: Stats): Stats => {
    const reduction = calculateReduction(stats.energy);

    return {
        saturation: stats.saturation - reduction,
        hydration: stats.hydration - reduction,
        energy: stats.energy - 10,
        lastUpdate: Date.now(),
        name: stats.name,
    };
};

export const checkDeath = (stats: Stats): boolean => {
    return stats.energy <= 0 && stats.hydration <= 0 && stats.saturation <= 0;
};

export const offlineProgression = (stats: Stats): Stats => {
    const offlineMS = Date.now() - stats.lastUpdate;

    const offlineTicks = offlineMS / (1000 * 60 * 60);

    let newStats = stats;
    for (let i = 0; i < offlineTicks; ++i) {
        newStats = calculateNewStats(stats);

        if (checkDeath(newStats)) {
            return newStats;
        }
    }

    return newStats;
};

export default calculateNewStats;
