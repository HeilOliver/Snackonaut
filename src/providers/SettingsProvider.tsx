import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const settingsKey = "settings";

interface Settings {
    debugMode: boolean;
}

interface SettingsContextValues {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const SettingsContext = React.createContext<SettingsContextValues>({
    settings: { debugMode: false },
    setSettings: () => {},
});

const SettingsProvider: React.FC = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({ debugMode: false });
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    useEffect(() => {
        if (settingsLoaded) {
            const saveSettings = async () => {
                await AsyncStorage.setItem(
                    settingsKey,
                    JSON.stringify(settings)
                );
            };
            saveSettings();
        }
    }, [settings]);

    useEffect(() => {
        const loadSettings = async () => {
            const storedStats = await AsyncStorage.getItem(settingsKey);

            if (storedStats) {
                setSettings(JSON.parse(storedStats));
            }

            setSettingsLoaded(true);
        };

        loadSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
