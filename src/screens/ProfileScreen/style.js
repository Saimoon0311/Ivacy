import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';
import { globalStyles } from '../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == 'ios' ? hp('5') : hp('2'),
    flex:1,
    alignItems:'center',
    // justifyContent:'space-evenly'
    backgroundColor:'white'
    
  },
  updateProTxt:{
    fontWeight:'bold',
    color:color.textThirdColor,
    fontSize:hp('2.5'),
    marginTop:hp('5'),
    marginBottom:hp('2'),
    ...globalStyles.globalTextStyles3
  },
  loadingView: {
    position: 'absolute',
    height: hp('100'),
    width: wp('100'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42,42,42,0.6)',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  loadingText: {color: 'white', fontSize: hp('3'), fontWeight: 'bold'},
});
