import Stats from "../providers/StatsType";

const calculateReduction = (energy: Stats["energy"]) => energy * -0.1 + 15;

const calculateNewStats = (stats: Stats): Stats => {
    const reduction = calculateReduction(stats.energy);

    return {
        saturation: stats.saturation - reduction,
        hydration: stats.hydration - reduction,
        energy: stats.energy - 10,
    };
};

export default calculateNewStats;
