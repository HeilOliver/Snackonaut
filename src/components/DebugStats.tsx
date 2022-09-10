import { Button, Center, HStack } from "native-base";
import React, { useContext } from "react";
import { StatsContext } from "../providers/StatsProvider";

const DebugStats = () => {
    const { stats, setEnergy, setWeight, setHealth } = useContext(StatsContext);

    return (
        <Center style={{ marginVertical: 10 }}>
            <HStack space={1}>
                <Button onPress={() => setEnergy(stats.energy + 100)}>
                    +100 Energy
                </Button>
                <Button onPress={() => setWeight(stats.weight + 5)}>
                    +5 Weight
                </Button>
                <Button onPress={() => setHealth(stats.health + 5)}>
                    +5 Health
                </Button>
            </HStack>
        </Center>
    );
};

export default DebugStats;
