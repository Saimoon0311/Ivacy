import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {CountryNameUrl, SearchrUrl} from '../../config/Urls';
import {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {styles} from './styles';
import {color} from '../../components/color';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {errorMessage} from '../../components/NotificationMessage';

export default function SearchBarScreen({navigation}) {
  const {userData} = useSelector(state => state.userData);
  const [countryPicker, setCountryPicker] = useState([]);
  const [countryName, seCountryName] = useState('');
  const [searchData, setSearchData] = useState({
    country_id: null,
    startPrice: '0',
    EndPrice: '2600000000000',
    isPrice: '0',
  });
  const [isloading, setIsloading] = useState(false);
  const {country_id, startPrice, EndPrice, isPrice} = searchData;
  const goBack = () => {
    navigation.goBack();
  };
  const updateState = data => setSearchData(() => ({...searchData, ...data}));

  const getAllCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      if (res.status == 200) {
        setCountryPicker(res.json.data);
      } else {
        errorMessage(
          'Please Check Your Internet connection to get Countries Name.',
        );
      }
    });
  };
  let allstate = {
    is_price: EndPrice == '2600000000000' ? '0' : '1',
    startPrice: startPrice,
    EndPrice: EndPrice,
    id: country_id,
    name: countryName,
  };
  const applyFilterFun = () => {
    setIsloading(true);
    if (country_id != null) {
      let url = SearchrUrl + country_id;
      let body = JSON.stringify({
        is_price: EndPrice == '2600000000000' ? '0' : '1',
        start_price: startPrice,
        end_price: EndPrice,
      });
      ApiPost(url, body, false, userData.access_token).then(res => {
        if (res.status == 200 || res.status == 404) {
          navigation.navigate('PackageScreen', {
            data: res.json.data,
            countryName: countryName,
          });
          setIsloading(false);
        } else {
          setIsloading(false);
          errorMessage('Network Request Failed.');
        }
      });
    } else {
      setIsloading(false);
      errorMessage('Please Select Country.');
    }
  };
  useEffect(() => {
    getAllCountryName();
  }, []);
  return (
    <View>
      <BackHeaderCom goBack={goBack} text="Filter Screen" />
      <ScrollView>
        {countryPicker.length > 0 ? (
          <>
            <Text
              style={{
                ...globalStyles.globalTextStyles,
                fontSize: hp('2.5'),
                marginLeft: wp('5'),
                marginTop: hp('4'),
              }}>
              Search Your Place!
            </Text>
            {/* <Text
              style={{
                marginTop: hp('2'),
                fontSize: hp('2'),
                color: color.black,
                marginLeft: wp('2'),
              }}>
              Country
            </Text> */}
            <View
              style={{
                ...styles.pickerStyle,
                borderColor:
                  country_id != '' || country_id == null
                    ? color.black
                    : color.themeColorDark,
              }}>
              <Picker
                mode="dialog"
                selectedValue={country_id}
                dropdownIconColor={'black'}
                itemStyle={{color: 'black'}}
                dropdownIconRippleColor="red"
                style={{color: 'black'}}
                onValueChange={(country_id, index) => {
                  seCountryName(countryPicker[index - 1].name);
                  updateState({country_id});
                }}
                collapsable={true}>
                <Picker.Item
                  style={{color: color.themeColorDark}}
                  key={null}
                  value={null}
                  label={'Select the Country Name'}
                />
                {countryPicker.map(res => {
                  return (
                    <Picker.Item key={res.id} value={res.id} label={res.name} />
                  );
                })}
              </Picker>
            </View>
          </>
        ) : (
          <SkypeIndicator
            color={color.textThirdColor}
            size={hp('6')}
            style={{
              alignSelf: 'center',
              marginTop: hp('2'),
            }}
          />
        )}
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.5'),
            marginLeft: wp('5'),
          }}>
          Enter Your Price range!
        </Text>
        <View style={styles.inputView}>
          <TextInput
            value={startPrice}
            style={styles.inputField}
            keyboardType="numeric"
            onChangeText={startPrice => updateState({startPrice})}
            placeholder="price"
            placeholderTextColor={'gray'}
          />
          <Text
            style={{
              ...globalStyles.globalTextStyles,
              fontSize: hp('2'),
            }}>
            - To -
          </Text>
          <TextInput
            value={EndPrice}
            style={styles.inputField}
            keyboardType="numeric"
            onChangeText={EndPrice => updateState({EndPrice})}
            placeholderTextColor={'gray'}
            placeholder="price"
          />
        </View>
        {isloading ? (
          <SkypeIndicator
            color={color.bottomBarColor}
            size={hp('6')}
            style={{marginTop: hp('3')}}
          />
        ) : (
          <TouchableOpacity
            // onPress={() => applyFilterFun()}
            onPress={() =>
              navigation.navigate('PackageScreen', {
                data: allstate,
                type: 'search',
              })
            }
            style={styles.buttonView}>
            <Text style={styles.buttonText}>Apply Filter</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
