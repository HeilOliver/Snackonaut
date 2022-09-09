import { HStack, Switch, Text, useColorMode } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <SafeAreaView>
            <HStack space={ 2 } alignItems="center">
                <Text>Dark</Text>
                <Switch
                    isChecked={ colorMode === "light" }
                    onToggle={ toggleColorMode }
                    aria-label={
                        colorMode === "light"
                            ? "switch to dark mode"
                            : "switch to light mode"
                    }
                />
                <Text>Light</Text>
            </HStack>
        </SafeAreaView>
    );
}

export default Settings;
