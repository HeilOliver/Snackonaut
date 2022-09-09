import { Box, Center, Progress, VStack, Text } from "native-base";
import React, { useContext } from "react";
import { StatsContext } from "../providers/StatsProvider";

export const Stats = () => {
    const { stats } = useContext(StatsContext);

    return (
        <Center w="100%">
            <Box w="100%">
                <VStack space="md">
                    <VStack mx="4" space="md">
                        <Text>Saturation</Text>
                        <Progress
                            colorScheme="orange"
                            value={stats.saturation}
                        />
                        <Text>Hydration</Text>
                        <Progress
                            colorScheme="lightBlue"
                            value={stats.hydration}
                        />
                        <Text>Energy</Text>
                        <Progress colorScheme="green" value={stats.energy} />
                    </VStack>
                </VStack>
            </Box>
        </Center>
    );
};
