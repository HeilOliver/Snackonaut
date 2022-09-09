import { Button, Center } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stats } from "../components/Stats";

const Home = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={ styles.container }>
            <Center
                _dark={ { bg: "blueGray.900" } }
                _light={ { bg: "blueGray.50" } }
                px={ 4 }
                flex={ 1 }
            >
                <Stats/>
                <Button onPress={ () => navigation.navigate('Camera') }>
                    Camera
                </Button>
                <Button onPress={ () => navigation.navigate('Settings') }>
                    Settings
                </Button>
            </Center>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Home;
