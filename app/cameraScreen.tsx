import React, { useState } from "react";
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroTrackingReason,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAmbientLight,
} from "@viro-community/react-viro";
import { Image, View} from "react-native";

const cameraScreen = () => {
  const [text, setText] = useState("Initializing AR...");

  //register target
  ViroARTrackingTargets.createTargets({
    testIcon:{
      source: require('../assets/icons/testIcon1.jpg'),
      orientation: 'Up',
      physicalWidth: 0.165
    }
  })

  const anchorFound = () => {
    console.log("Anchor/Image Detected");
  }

  return (
    <View className="flex-1 relative">
      <ViroARScene>
        <ViroARImageMarker target="testIcon" onAnchorFound={anchorFound}>
          <ViroAmbientLight color="#ffffff"/>
          <ViroText
            text={text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            className="font-sans text-lg text-white text-center"
          />
        </ViroARImageMarker>
      </ViroARScene>
      <Image
        source={require('../images/ScanningOverlay.png')}
      />
    </View>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: cameraScreen,
      }}
      className="flex-1"
    />
  );
};
