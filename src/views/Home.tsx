import { Button, Center, StatusBar, View } from "native-base";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DebugStats from "../components/DebugStats";
import { Stats } from "../components/Stats";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../types/RootStackParamList";
import { SettingsContext } from "../providers/SettingsProvider";
import Snackonout from "../components/Snackonaut";
import ThemeWrapper from "../components/ThemeWrapper";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const { settings } = useContext(SettingsContext);

  return (
    <ThemeWrapper>
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
          <Center style={styles.snackonout}>
            <Snackonout />
          </Center>
          <View>
            <Stats />
            {settings.debugMode && <DebugStats />}
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
          </View>
          <StatusBar />
        </View>
      </SafeAreaView>
    </ThemeWrapper>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
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
