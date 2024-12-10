import { TouchableOpacity, Text} from 'react-native'
import React from 'react'

const CustomButtons = ({title, handlePress}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className='bg-stone-500 rounded-xl min-h-[50px] justify-center items-center'
    >
        <Text className='text-lg'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButtons