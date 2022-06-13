import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { styles } from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../color';

import { TextInputCom } from '../TextInputCompenent/textInputCom';

const TextImageComponent = props => {
  const colors=props?.textcolor?props?.textcolor:color.textColor
  return (
    <TouchableOpacity style={styles.button}>

    <Ionicons style={styles.image}  name={props?.iconName} color={colors} size={20} /> 
    <Text style={{...styles.text,color:colors}}>{props?.text}</Text>

</TouchableOpacity>  
  )
}

export default TextImageComponent
