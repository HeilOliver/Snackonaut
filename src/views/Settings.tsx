import { HStack, Switch, Text, useColorMode } from "native-base";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsContext } from "../providers/SettingsProvider";

const Settings = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const { settings, setSettings } = useContext(SettingsContext);

    return (
        <SafeAreaView>
            <HStack space={2} alignItems="center">
                <Text>Dark</Text>
                <Switch
                    isDisabled={true}
                    isChecked={colorMode === "light"}
                    onToggle={toggleColorMode}
                    aria-label={
                        colorMode === "light"
                            ? "switch to dark mode"
                            : "switch to light mode"
                    }
                />
                <Text>Light</Text>
            </HStack>

            <HStack space={2} alignItems="center">
                <Text>Debug Mode</Text>
                <Switch
                    isChecked={settings.debugMode}
                    onToggle={() =>
                        setSettings({
                            ...settings,
                            debugMode: !settings.debugMode,
                        })
                    }
                />
            </HStack>
        </SafeAreaView>
    );
};

export default Settings;
