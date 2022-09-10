import { useContext } from "react";
import { StatsContext } from "../providers/StatsProvider";
import WebView from "react-native-webview";
import Stats from "../providers/StatsType";
import RNFS from "react-native-fs";

const emotionSum = (stats: Stats) => {
  return Object.values(stats).reduce((a, b) => a + b, 0);
};

const Snackonout = () => {
  const { stats } = useContext(StatsContext);
  const emotion = emotionSum(stats);

  switch (emotion) {
    default:
      return (
          <WebView
              scalesPageToFit={false}
              originWhitelist={['*']}
              domStorageEnabled={true}
              source={{uri: `file:// ${RNFS.DocumentDirectoryPath}/assets/animated-triangle.svg`}}
              style={{
                width: 300,
                height: 300,
              }}
          />
      );
  }
};

export default Snackonout;
