import {Text, View, Button, TouchableOpacity} from 'react-native'
import React, { useState , useEffect, useRef} from 'react'
import { Camera, CameraType, CameraView, useCameraPermissions} from 'expo-camera';


const cameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  if (!permission){
    return <View/>;
  }

  if(!permission.granted){
    return (
        <View>
          <Text>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
  }

  function toggleCameraFacing(){
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className='flex-1 justify-center'>
      <CameraView facing={facing} className='flex-1'>
        <View>
          <TouchableOpacity onPress={toggleCameraFacing} className='bg-white'>
            <Text className='text-2xl text-black text-center'>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default cameraScreen