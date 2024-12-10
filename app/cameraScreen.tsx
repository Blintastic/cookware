import {Text, View, Button, Image} from 'react-native'
import React, { useState , useEffect, useRef} from 'react'
import { Camera, CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import CustomButtons from '@/components/CustomButtons';
import { Redirect, router} from "expo-router";


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
        <Image
          source={require('../images/4414805.png')}
          className='absolute top-1/4 left-[40px] w-4/5 h-2/5'
          resizeMode="contain"
        />

        <View className='absolute bottom-0 w-full h-1/2 flex items-center justify-center'>
        <CustomButtons
          title="TESTScanned IconTEST"
          handlePress={() => router.push('/cookingVideoScreen')}
        >
        </CustomButtons>
        </View>
      </CameraView>
    </View>
  );
}

export default cameraScreen