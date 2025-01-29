import React, { useState } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAmbientLight,
} from "@viro-community/react-viro";
import { Image, View, Text } from "react-native";
import BackButton from "@/components/BackButton";

// Array mit zu erkennenden Icons
const iconsArray = [
  {
    name: "testIcon1",
    source: require("../assets/icons/testIcon1.jpg"),
    physicalWidth: 0.165,
  },
  {
    name: "testIcon2",
    source: require("../assets/icons/testIcon2.jpg"),
    physicalWidth: 0.2,
  },
];

// Tracking-Ziele registrieren
const trackingTargets: Record<string, { source: any; orientation: string; physicalWidth: number }> = {};
iconsArray.forEach((icon) => {
  trackingTargets[icon.name] = {
    source: icon.source,
    orientation: "Up",
    physicalWidth: icon.physicalWidth,
  };
});
ViroARTrackingTargets.createTargets(trackingTargets);

const ARScene = ({ onDetect }: { onDetect: (name: string | null) => void }) => {
  const handleAnchorFound = (targetName: string) => {
    console.log(`Detected: ${targetName}`);
    onDetect(targetName);
  };

  const handleAnchorLost = (targetName: string) => {
    console.log(`Lost: ${targetName}`);
    onDetect(null);
  };

  return (
    <ViroARScene>
      {iconsArray.map((icon) => (
        <ViroARImageMarker
          key={icon.name}
          target={icon.name}
          onAnchorFound={() => handleAnchorFound(icon.name)}
          onAnchorRemoved={() => handleAnchorLost(icon.name)}
        >
          <ViroAmbientLight color="#ffffff" />
        </ViroARImageMarker>
      ))}
    </ViroARScene>
  );
};

// Kamera-Screen mit Overlay
const CameraScreen = () => {
  const [detectedText, setDetectedText] = useState<string | null>(null);

  return (
    <View className="flex-1 relative">
      <BackButton/>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <ARScene onDetect={setDetectedText} />,
        }}
        className="flex-1"
      />
      <Image
        source={require("../images/ScanningOverlay.png")}
        className="absolute inset-0"
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: 500,  // Erhöhte Breite
          height: 500, 
          transform: [{ translateX: -100 }, { translateY: -100 }], // Anpassung für die neue Größe
        }}
      />

      {/* Overlay für Scan-Ergebnis */}
      {detectedText && (
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Erkannt: {detectedText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
