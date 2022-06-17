import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    fontSize: hp('6'),
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? hp('5') : hp('2'),
    height: hp('95'),
  },
  button: {
    flexDirection: 'row',
    backgroundColor: color.background2,
    width: wp('85'),
    height: hp('6'),
    marginBottom: hp('1.5'),
    alignItems: 'center',
  },
  image: {
    marginHorizontal: wp('3'),
  },
  text: {
    fontSize: hp('2.6'),
    fontWeight: '600',
    color: color.textThirdColor,
  },
});
