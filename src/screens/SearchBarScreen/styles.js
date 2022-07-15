import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  pickerStyle: {
    width: Platform.OS == 'ios' ? wp('95') : wp('90'),
    height: hp(Platform?.OS == 'ios' ? '20' : '6'),
    color: 'black',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: Platform.OS == 'ios' ? hp('1') : hp('2'),
    borderRadius: 5,
    borderWidth: Platform.OS == 'ios' ? 0 : 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  inputView: {
    width: wp('90'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    width: wp('40'),
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    height: Platform.OS == 'ios' ? hp('5') : hp('6'),
    paddingLeft: wp('2'),
    textAlignVertical: 'center',
  },
  buttonView: {
    backgroundColor: color.bottomBarColor,
    width: wp('50'),
    height: hp('6'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp('4'),
  },
  buttonText: {color: color.white, fontSize: hp('2'), fontWeight: 'bold'},
});
