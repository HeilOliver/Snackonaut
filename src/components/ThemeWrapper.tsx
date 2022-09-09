import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const ThemeWrapper: React.FC = ({ children }) => {
  return (
    <View
      _dark={{
        bg: "coolGray.800",
      }}
      _light={{
        bg: "warmGray.50",
      }}
      style={styles.container}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemeWrapper;
