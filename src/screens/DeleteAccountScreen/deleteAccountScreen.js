import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './styles';
import {useState} from 'react';
import {color} from '../../components/color';
import {SkypeIndicator} from 'react-native-indicators';
// import {Checkbox} from 'react-native-paper';
import {Checkbox} from 'native-base';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {DeleteAccountUrl, LogoutUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import {
  errorMessage,
  successMessage,
} from '../../components/NotificationMessage';
import {store} from '../../Redux/Reducer';
import RNRestart from 'react-native-restart';
import types from '../../Redux/type';

const DeleteAccountScreen = ({navigation}) => {
  const {userData} = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const warningList = [
    'After your account has been deleted, you can sign up again with the same email or add that email to another account as long as it has not been taken by a new person on Ivacay.',
    'Bear in mind that if your account has been removed for violating Community Guidelines, you may not be able to sign up again with the same email.',
    "For security reasons, we can't delete an account for you. You'll need to be able to log in to your account to request deletion. If you can't remember your password or email, take a look at some tips for logging in.",
    "Before deleting your account, you may want to log in and download a copy of your information (such as your photos and posts) from Ivacay. After your account has been deleted, you will not have access to Ivacay's Data Download tool.",
  ];
  const resetNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'TravGuiderScreen'}],
      }),
    );
  };

  const deleteAccountFun = () => {
    setLoading(true);
    let url = DeleteAccountUrl + userData.data.id;
    if (checkBox == true) {
      ApiGet(url).then(res => {
        if (res.status == 200) {
          successMessage(res.json.message);
          dispatch({
            type: types.LogoutType,
          });
          setLoading(false);
        } else if (res.status == 404) {
          errorMessage('Something went wrong.');
          setLoading(false);
        } else {
          errorMessage('Something went wrong.');
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      errorMessage('Please accept terms & condition.');
    }
  };

  return (
    <View>
      <BackHeaderCom goBack={() => navigation.goBack()} text="Delete Account" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp('10'),
        }}>
        <View style={styles.containerStyle}>
          <TextInput
            style={styles.destxtInputContainer}
            value={userData?.data?.email}
            onChangeText={email => setEmail(email)}
            inputText="Email"
            placeholder="mail@gmail.com"
            placeholderTextColor={'gray'}
            editable={false}
          />
          {warningList.map((res, i) => {
            return (
              <View style={styles.textContainer}>
                <Text style={styles.numberStyle}>{i + 1}) </Text>
                <Text style={styles.contentStyle}>{res}</Text>
              </View>
            );
          })}
          <View style={{marginTop: hp('2')}}>
            <Checkbox
              shadow={2}
              value="test"
              colorScheme="purple"
              onChange={e => {
                setCheckBox(e);
              }}
              accessibilityLabel="This is a dummy checkbox"
              defaultIsChecked={false}>
              I accept the terms & conditions
            </Checkbox>
          </View>
          <TouchableOpacity
            onPress={() => deleteAccountFun()}
            style={styles.btnContainer}>
            {loading ? (
              <SkypeIndicator
                color={color.white}
                size={hp('3')}
                style={{
                  alignSelf: 'center',
                }}
              />
            ) : (
              <Text style={styles.btn}>Delete Your Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteAccountScreen;
