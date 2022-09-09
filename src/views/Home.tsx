import {
    Box,
    Button,
    Center,
    HStack,
    StatusBar,
    Text,
    View,
} from "native-base";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DebugStats from "../components/DebugStats";
import { Stats } from "../components/Stats";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../types/RootStackParamList";
import { SettingsContext } from "../providers/SettingsProvider";
import Snackonout from "../components/Snackonaut";
import { StatsContext } from "../providers/StatsProvider";
import EditName from "../components/EditName";

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Home"
    >;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
    const { settings } = useContext(SettingsContext);
    const { stats } = useContext(StatsContext);

    return (
        <SafeAreaView style={styles.container}>
            <HStack>
                <Text fontSize="2xl" textAlign="center" width={80}>
                    {stats.name}
                </Text>
                <EditName />
            </HStack>
            <Center style={styles.snackonout}>
                <Snackonout />
            </Center>
            <View>
                <Stats />
                {settings.debugMode && <DebugStats />}
                <View style={styles.buttonRow}>
                    <Button
                        style={styles.button}
                        onPress={() => navigation.navigate("SnackCamera")}
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
            </View>
            <StatusBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        minHeight: 700,
    },
    snackonout: {
        flex: 1,
        justifyContent: "center",
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
