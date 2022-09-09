import { Box, Center, Progress, VStack, Text } from "native-base";
import React from "react";

export const Stats = () => {
    return (
        <Center w="100%">
            <Box w="100%">
                <VStack space="md">
                    <VStack mx="4" space="md">
                        <Text>Saturation</Text>
                        <Progress colorScheme="orange" value={35} />
                        <Text>Hydration</Text>
                        <Progress colorScheme="lightBlue" value={45} />
                        <Text>Energy</Text>
                        <Progress colorScheme="green" value={65} />
                    </VStack>
                </VStack>
            </Box>
        </Center>
    );
};
