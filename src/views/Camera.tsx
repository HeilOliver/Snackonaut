import { Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodScanner from "../components/FoodScanner";

const Camera = () => {
    return (
        <SafeAreaView>
            <FoodScanner/>
        </SafeAreaView>
    );
}

export default Camera;
