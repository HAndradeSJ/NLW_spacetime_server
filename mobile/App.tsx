import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import React from 'react'

export default function App(): any {
  // função que retorna um boleano enquanto as fonts nn carregar
  const [hadsloadfonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  if (!hadsloadfonts) {
    return null
  }
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 ">
      <Text className="text-5xl font-bold text-gray-50 font-title">
        Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
