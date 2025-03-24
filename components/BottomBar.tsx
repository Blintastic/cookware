import { View, Image, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window");

const BottomBar = () => {
  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      left: 0,
      width: width,  // Ensures full width
      alignItems: 'center',  // Centers the image
    }}>
      <Image
        style={{ height: 150, width: 405 }}
        source={require("../assets/ui/BottomBar.png")}
      />
    </View>
  )
}

export default BottomBar
