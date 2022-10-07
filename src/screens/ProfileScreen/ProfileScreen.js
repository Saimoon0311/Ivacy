import {ActivityIndicator, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../ProfileScreen/style';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {TextInput} from 'react-native';
import SimpleInputComponent from '../../components/SimpleInputComponent/SimpleInputComponent';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';
import {useSelector} from 'react-redux';
import {updateProfileUrl} from '../../config/Urls';
import {ApiPost} from '../../config/helperFunction';
import {
  errorMessage,
  successMessage,
} from '../../components/NotificationMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ArrowButtonComponenetDup } from '../../components/ArrowButtonComponenetDup/ArrowButtonComponenetDup';
import { BackHeaderCom } from '../../components/BackHeaderComponent/backHeaderCom';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const [isloading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    full_name: '',
    account_title: '',
    account_number: '',
    phone: '',
    address: '',
    zip_code: '',
  });
  const {full_name, account_title, account_number, phone, address, zip_code} =
    updateData;
  const updateState = data => setUpdateData(prev => ({...prev, ...data}));
  const [isFocused, setIsFocused] = useState({
    full_name: false,
    account_title: false,
    account_number: false,
    phone: false,
    address: false,
    zip_code: false,
  });

  const handleFocus = textinput => {
    setIsFocused({
      [textinput]: true,
    });
  };

  const handleBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };
  const userData = useSelector(state => state.userData);
  const url =
    updateProfileUrl + userData?.userData?.data?.get_user_profile?.user_id;
  updateProfileFunction = () => {
    let body = JSON.stringify(updateData);
    setLoading(true);
    if (
      full_name != '' &&
      account_title != '' &&
      account_number != '' &&
      phone != '' &&
      address != '' &&
      zip_code != ''
    ) {
      ApiPost(url, body, false).then(res => {
        if (res.status == 200) {
          setLoading(false);
          successMessage('Your profile has been updated');
        } else {
          errorMessage('Network request failed.');
          setLoading(false);
        }
      });
    } else {
      errorMessage('Plesae type correct information.');
      setLoading(false);
    }
  };

  return (<>
      <BackHeaderCom text={"Update Profile"} goBack={()=>navigation.goBack()}/>
    <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
      {isloading && (
        <View style={styles.loadingView}>
          <ActivityIndicator
            size={'large'}
            color="white"
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {/* <Ionicons
              name="arrow-back"
              color={color.borderThirdColor}
              size={hp('5')}
            onPress={()=>navigation.goBack()}
            style={{alignSelf:'flex-start',padding:8}}
              // style={{backgroundColor:'red',top: hp('4'), left: wp('2')}}
            /> */}

      <Text style={styles.updateProTxt}>UPDATE PROFILE</Text>
      <SimpleInputComponent
        text={'FULL NAME'}
        isFocused={isFocused.full_name}
        onFocus={() => handleFocus('full_name')}
        onBlur={() => handleBlur(full_name)}
        value={full_name}
        placeholder={'Full Name '}
        onChangeText={full_name => updateState({full_name})}
      />
      <SimpleInputComponent
        text={'ACCOUNT TITLE'}
        isFocused={isFocused.account_title}
        onFocus={() => handleFocus('account_title')}
        onBlur={() => handleBlur(account_title)}
        value={account_title}
        placeholder={'Account Title'}
        onChangeText={account_title => updateState({account_title})}
        
      />
      <SimpleInputComponent
        text={'ACCOUNT NUMBER'}
        isFocused={isFocused.account_number}
        onFocus={() => handleFocus('account_number')}
        onBlur={() => handleBlur(account_number)}
        value={account_number}
        placeholder={'Account Number'}
        onChangeText={account_number => updateState({account_number})}
        keyboardType={'decimal-pad'}    
      />
      <SimpleInputComponent
        text={'PHONE NUMBER'}
        isFocused={isFocused.phone}
        onFocus={() => handleFocus('phone')}
        onBlur={() => handleBlur(phone)}
        value={phone}
        placeholder={'Phone Number'}
        onChangeText={phone => updateState({phone})}
        keyboardType={'decimal-pad'}    

      />
      <SimpleInputComponent
        text={'ADDRESS'}
        isFocused={isFocused.address}
        onFocus={() => handleFocus('address')}
        onBlur={() => handleBlur(address)}
        value={address}
        placeholder={'Address'}
        onChangeText={address => updateState({address})}
      />
      <SimpleInputComponent
        text={'ZIP CODE'}
        isFocused={isFocused.zip_code}
        onFocus={() => handleFocus('zip_code')}
        onBlur={() => handleBlur(zip_code)}
        value={zip_code}
        placeholder={'Zip Code'}
        onChangeText={zip_code => updateState({zip_code})}
        keyboardType={'decimal-pad'}    

      />
      <ArrowButtonComponenetDup
      backgroundColor={color.textThirdColor}
                  loaderColor={color.boxColor}

        fontWeight={'600'}
        borderColor={color.black}
        borderWidth={1}
        iconColor={color.white}
        color={color.white}
        width={wp('90')}
        text={'Update Profile'}
        onPress={() => updateProfileFunction()}
      />
    </ScrollView>
  </>
  );
};

export default ProfileScreen;
