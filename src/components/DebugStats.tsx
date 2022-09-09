import { Button, Center, HStack } from "native-base";
import React, { useContext } from "react";
import { StatsContext } from "../providers/StatsProvider";

const DebugStats = () => {
    const { stats, setEnergy, setHydration, setSaturation } =
        useContext(StatsContext);

    return (
        <Center style={{ marginVertical: 10 }}>
            <HStack space={1}>
                <Button onPress={() => setSaturation(stats.saturation + 10)}>
                    +10 Saturation
                </Button>
                <Button onPress={() => setHydration(stats.hydration + 10)}>
                    +10 Hydration
                </Button>
                <Button onPress={() => setEnergy(stats.energy + 10)}>
                    +10 Energy
                </Button>
            </HStack>
        </Center>
    );
};

export default DebugStats;
