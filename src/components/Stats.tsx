import { Box, Center, Progress, VStack, Text } from "native-base";
import React, { useContext } from "react";
import { StatsContext } from "../providers/StatsProvider";
import { dailyCOnsumption, maxValues, minValues } from "../providers/StatsType";

export const Stats = () => {
    const { stats } = useContext(StatsContext);

    return (
        <Center w="100%">
            <Box w="100%">
                <VStack space="md">
                    <VStack mx="4" space="md">
                        <Text>
                            Energy ({Math.floor(stats.energy)}/
                            {maxValues.energy})
                        </Text>
                        <Progress
                            colorScheme="green"
                            value={stats.energy}
                            min={minValues.energy}
                            max={maxValues.energy}
                        />

                        <Text>
                            Weight ({Math.floor(stats.weight)}/
                            {maxValues.weight})
                        </Text>
                        <Progress
                            colorScheme="lightBlue"
                            value={stats.weight}
                            min={minValues.weight}
                            max={maxValues.weight}
                        />

                        <Text>
                            Health ({Math.floor(stats.health)}/
                            {maxValues.health})
                        </Text>
                        <Progress
                            colorScheme="red"
                            value={stats.health}
                            min={minValues.health}
                            max={maxValues.health}
                        />
                    </VStack>
                </VStack>
            </Box>
        </Center>
    );
};
