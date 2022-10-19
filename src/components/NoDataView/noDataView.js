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
  let paddingTop = props?.paddingTop ? props.paddingTop : hp('13');
  let marginBottom = props?.marginBottom ? props.marginBottom : hp('50');

  return (
    <View style={{...styles.mainView, paddingTop: paddingTop}}>
      <View
        style={{
          ...styles.innerView,
          width: width,
          height: height,
          marginBottom: marginBottom,
        }}>
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
    backgroundColor: color.lightPurple,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:color.bottomBarColorlightView,
  },
});
