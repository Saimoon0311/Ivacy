import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const NoDataView = props => {
  let width = props?.width ? props.width : wp('70');
  let height = props?.height ? props.height : hp('30');
  return (
    <View style={styles.mainView}>
      <View style={{...styles.innerView, width: width, height: height}}>
        <MaterialIcons
          name="search-off"
          color={color.bottomBarColor}
          size={hp('10')}
        />
        <Text style={styles.noProductText}>{props?.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noProductText: {
    color: color.bottomBarColor,
    fontSize: hp('2'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerView: {
    alignSelf: 'center',
    backgroundColor: color.lightView,
    justifyContent: 'center',
    marginBottom: hp('50'),
    borderRadius: 20,
    alignItems: 'center',
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('13'),
  },
});
