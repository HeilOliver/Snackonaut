import Stats, { dailyCOnsumption } from "../providers/StatsType";

const calculateWeight = (stats: Stats) => {
    if (stats.energy > 2100) {
        return stats.weight + 2;
    } else if (stats.energy < 700) {
        return stats.weight - 2;
    }

    return stats.weight;
};

const calculateHealth = (stats: Stats) => {
    let healthChange = 0;

    if (stats.weight > 90 || stats.weight < 60) {
        --healthChange;
    } else {
        ++healthChange;
    }

    if (stats.energy > 2100 || stats.energy < 700) {
        --healthChange;
    }

    return stats.health + healthChange;
};

const calculateNewStats = (stats: Stats): Stats => {
    return {
        energy: stats.energy - dailyCOnsumption.energy / 24,
        weight: calculateWeight(stats),
        health: calculateHealth(stats),
        lastUpdate: Date.now(),
        name: stats.name,
    };
};

export const checkDeath = (stats: Stats): boolean => {
    return stats.health <= 0;
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
