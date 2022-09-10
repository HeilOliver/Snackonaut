export default interface Stats {
    health: number;
    weight: number;
    energy: number;
    lastUpdate: number;
    name: string;
}

export const dailyCOnsumption = {
    energy: 2000 as const,
};

export const maxValues = {
    health: 100 as const,
    weight: 120 as const,
    energy: 2500 as const,
};

export const minValues = {
    health: 0 as const,
    weight: 40 as const,
    energy: 0 as const,
};
