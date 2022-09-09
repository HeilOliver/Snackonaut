import { Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeWrapper from "../components/ThemeWrapper";

const Camera = () => {
  return (
    <ThemeWrapper>
      <SafeAreaView>
        <Text>Camera</Text>
      </SafeAreaView>
    </ThemeWrapper>
  );
};

export default Camera;
