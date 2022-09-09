import { Button, StatusBar, View } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DebugStats from "../components/DebugStats";
import { Stats } from "../components/Stats";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import RootStackParamList from "../types/RootStackParamList";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

type Props = {
    navigation: HomeScreenNavigationProp;
}

const Home = ({ navigation }: Props) => {

    return (
        <SafeAreaView style={styles.container}>
            <Stats />
            <DebugStats />

            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("Camera")}
                >
                    📸
                </Button>
                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("Settings")}
                >
                    🔧
                </Button>
            </View>
            <StatusBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 20,
    },
    buttonRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: "lightgrey",
        width: "48%",
    },
});

export default Home;
