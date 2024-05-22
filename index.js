import * as React from "react";
import "react-native-gesture-handler";
import "expo-dev-client";
import "expo-asset";
import { Text, View } from "react-native";
import { polyfillWebCrypto } from "./utils/polyfillWebCrypto";
import { registerRootComponent } from "expo";
import { enableScreens, enableFreeze } from "react-native-screens";

import { hideAsync } from "expo-splash-screen";

enableScreens();
enableFreeze();

polyfillWebCrypto();
hideAsync();

export function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Empty app</Text>
    </View>
  );
}

registerRootComponent(App);
