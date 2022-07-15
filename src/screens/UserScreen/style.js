import {Dimensions, Platform, StyleSheet} from 'react-native';
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
    paddingBottom: hp('10'),
    height: hp('100'),
    justifyContent: 'center',
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
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').width * 0.4,
  },
  text: {
    fontSize: hp('2.6'),
    fontWeight: '600',
    color: color.textThirdColor,
  },
  imageLoader: {
    backgroundColor: color.textImagebackgroundColor,
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').width * 0.4,
  },
});
