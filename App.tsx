import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { extendTheme, NativeBaseProvider, } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import themeConfig from "./config/theme";
import i18n from "./src/services/i18n";
import Camera from "./src/views/Camera";
import Home from "./src/views/Home";
import Settings from "./src/views/Settings";

//init i18n
i18n;

export const theme = extendTheme({ themeConfig });

type MyThemeType = typeof theme;

declare module "native-base" {
    interface ICustomTheme extends MyThemeType {
    }
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={ Home }
                            options={ { headerShown: false } }
                        />
                        <Stack.Screen
                            name="Camera"
                            component={ Camera }
                            options={ { headerShown: false } }
                        />
                        <Stack.Screen
                            name="Settings"
                            component={ Settings }
                            options={ { headerShown: false } }
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </SafeAreaProvider>
    );
}
