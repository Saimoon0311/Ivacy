import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../color'
const TextComponent = props => {
  return (
    <View>
      <Text style={{ color:props?.color }}>{props?.Text}</Text>
    </View>
  )
}

export default TextComponent
