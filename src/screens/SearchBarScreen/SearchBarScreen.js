import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import {globalStyles} from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {
  CountryNameUrl,
  FavoredSceneriesUrl,
  GetAllActivitesUrl,
  PackageBySceneriesUrl,
  SearchFilterUrl,
  SearchrUrl,
} from '../../config/Urls';
import {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {styles} from './styles';
import {color} from '../../components/color';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {errorMessage} from '../../components/NotificationMessage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import {Divider} from 'react-native-paper';

export default function SearchBarScreen({navigation}) {
  // let d = moment(1664276491879).format('YYYY-MM-DD');
  // let d = moment(new Date()).format('YYYY-MM-DD hh:mm:ss').fromNow();
  // let d = moment(1664276491879).format('L');
  // console.log(35, d);
  const date = new Date();
  const time = date.setDate(date.getDate() + 1);
  const LatestDate = moment(time).format('YYYY-MM-DD');
  const {userData} = useSelector(state => state.userData);
  const [countryPicker, setCountryPicker] = useState([]);
  const [activity, setActivity] = useState([]);
  const [favored, setFavored] = useState([]);
  const [countryName, seCountryName] = useState('');
  const [isDate, setIsDate] = useState(false);
  const [isDate2, setIsDate2] = useState(false);
  const [startDate, setStartDate] = useState(new Date(time));
  const [endDate, setEndDate] = useState(null);
  const [dummy, setDummy] = useState(0);
  const [searchData, setSearchData] = useState({
    country_id: null,
    favored_id: '',
    startPrice: '',
    EndPrice: '2600000000000',
    isPrice: '0',
    activities: [],
  });
  const [isloading, setIsloading] = useState(false);
  const {country_id, startPrice, EndPrice, isPrice, activities, favored_id} =
    searchData;
  const goBack = () => {
    navigation.goBack();
  };
  const updateState = data => setSearchData(() => ({...searchData, ...data}));

  const getAllDinamicData = (url, saveState) => {
    ApiGet(url).then(res => {
      if (res.status == 200) {
        saveState(res.json.data);
      } else {
        errorMessage(
          'Please Check Your Internet connection to get Countries Name.',
        );
      }
    });
  };
  let allstate = {
    startPrice: startPrice,
    country_id: country_id,
    name: countryName,
    favored_id: favored_id,
    startDate: moment(startDate).format('YYYY-MM-DD'),
    endDate: moment(endDate).format('YYYY-MM-DD'),
    activities: activities,
  };

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = date => {
  //   console.warn('A date has been picked: ', date);
  //   hideDatePicker();
  // };

  // const applyFilterFun = () => {
  //   setIsloading(true);
  //   if (country_id != null) {
  //     let url = SearchrUrl + country_id;
  //     let body = JSON.stringify({
  //       is_price: EndPrice == '2600000000000' ? '0' : '1',
  //       start_price: startPrice,
  //       end_price: EndPrice,
  //     });
  //     ApiPost(url, body, false, userData.access_token).then(res => {
  //       if (res.status == 200 || res.status == 404) {
  //         navigation.navigate('PackageScreen', {
  //           data: res.json.data,
  //           countryName: countryName,
  //         });
  //         setIsloading(false);
  //       } else {
  //         setIsloading(false);
  //         errorMessage('Network Request Failed.');
  //       }
  //     });
  //   } else {
  //     setIsloading(false);
  //     errorMessage('Please Select Country.');
  //   }
  // };
  const selectActivities = (v, i) => {
    if (activities.includes(v)) {
      updateState({
        activities: activities.filter(activities => activities.id !== v.id),
      });
    } else {
      updateState({activities: [...activities, v]});
    }
  };
  const upadateStartDate = e => {
    let d = moment(e?.nativeEvent?.timestamp).format('YYYY-MM-DD');
    setIsDate(false);
    // updateState({startDate: new Date(e.nativeEvent.timestamp)});
    setStartDate(new Date(e.nativeEvent.timestamp));
    setEndDate(new Date(e.nativeEvent.timestamp));
    // updateState({endDate: startDate});
    // updateState({endDate: new Date(e?.nativeEvent?.timestamp)});
  };
  const upadateEndDate = e => {
    setIsDate2(false);
    // let d = moment(e?.nativeEvent?.timestamp).format('YYYY-MM-DD');
    // updateState({endDate: d});
    // updateState({endDate: new Date(d)});
    setEndDate(new Date(e.nativeEvent.timestamp));
  };
  useEffect(() => {
    getAllDinamicData(CountryNameUrl, setCountryPicker);
    getAllDinamicData(GetAllActivitesUrl, setActivity);
    getAllDinamicData(FavoredSceneriesUrl, setFavored);
  }, []);
  return (
    <View>
      <BackHeaderCom goBack={goBack} text="Filter Screen" />
      <ScrollView contentContainerStyle={{paddingBottom: hp('20')}}>
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
        {favored.length > 0 ? (
          <>
            <Text
              style={{
                ...globalStyles.globalTextStyles,
                fontSize: hp('2.5'),
                marginLeft: wp('5'),
                marginTop: hp('4'),
              }}>
              Search Your Favored Scenery!
            </Text>
            <View
              style={{
                ...styles.pickerStyle,
                borderColor:
                  favored_id != '' || favored_id == null
                    ? color.black
                    : color.themeColorDark,
              }}>
              <Picker
                mode="dialog"
                selectedValue={favored_id}
                dropdownIconColor={'black'}
                itemStyle={{color: 'black'}}
                style={{color: 'black'}}
                onValueChange={(favored_id, index) => {
                  // seCountryName(countryPicker[index - 1].name);
                  updateState({favored_id});
                }}
                collapsable={true}>
                <Picker.Item
                  style={{color: color.themeColorDark}}
                  key={null}
                  value={null}
                  label={'Select the Country Name'}
                />
                {favored.map(res => {
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
          Enter your Price!
        </Text>
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
            fontSize: hp('2.5'),
            marginLeft: wp('5'),
          }}>
          Select your Date Range!
        </Text>

        {/* <View style={styles.inputView}>
          {isDate != null && isDate2 == true ? (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode={'date'}
              minimumDate={date}
              is24Hour={false}
              display="default"
              themeVariant="light"
              style={styles.datePicker}
              onChange={e => {
                upadateStartDate(e);
              }}
              onTouchCancel={() => {
                console.log(276), setIsDate(false);
              }}
            />
          ) : isDate == false ? (
            <TouchableOpacity
              onPress={() => setIsDate2(true)}
              style={{
                backgroundColor: '#E0E0E0',
                height: hp('4.5'),
                width: wp('33'),
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'black', fontSize: hp('2'), fontWeight: 'bold'}}>
                {moment(startDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsDate(true)}
              style={{
                backgroundColor: '#E0E0E0',
                height: hp('4.5'),
                width: wp('33'),
                borderRadius: 8,
              }}
            />
          )}
          <Text
            style={{
              ...globalStyles.globalTextStyles,
              fontSize: hp('2'),
            }}>
            - To -
          </Text>
          {endDate != null && isDate2 == true ? (
            <>
              <DateTimePicker
                testID="endDatePicker"
                value={endDate}
                mode={'date'}
                minimumDate={startDate}
                is24Hour={false}
                display="default"
                style={styles.datePicker}
                themeVariant="light"
                onChange={e => {
                  upadateEndDate(e);
                  // console.log(143, startDate), setIsDate(false);
                }}
                onTouchCancel={() => {
                  console.log(276), setIsDate2(false);
                }}
              />
            </>
          ) : isDate == false && Platform.OS == 'android' && endDate != null ? (
            <TouchableOpacity
              onPress={() => setIsDate2(true)}
              style={{
                backgroundColor: '#E0E0E0',
                height: hp('4.5'),
                width: wp('33'),
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'black', fontSize: hp('2'), fontWeight: 'bold'}}>
                {moment(endDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: '#E0E0E0',
                height: hp('4.5'),
                width: wp('33'),
                borderRadius: 8,
              }}
            />
          )}
        </View> */}
        <View style={styles.inputView}>
          {isDate == true && Platform.OS == 'android' ? (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode={'date'}
              minimumDate={date}
              is24Hour={false}
              display="default"
              themeVariant="light"
              style={styles.datePicker}
              onChange={e => {
                upadateStartDate(e);
              }}
              onTouchCancel={() => {
                console.log(276), setIsDate(false);
              }}
            />
          ) : Platform.OS == 'android' ? (
            <TouchableOpacity
              onPress={() => setIsDate(true)}
              style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {moment(startDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          ) : (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode={'date'}
              minimumDate={date}
              is24Hour={false}
              display="default"
              themeVariant="light"
              style={styles.datePicker}
              onChange={e => {
                upadateStartDate(e);
              }}
              onTouchCancel={() => {
                console.log(276), setIsDate(false);
              }}
            />
          )}
          <Text
            style={{
              ...globalStyles.globalTextStyles,
              fontSize: hp('2'),
            }}>
            - To -
          </Text>
          {endDate != null && isDate2 == true && Platform.OS == 'android' ? (
            <>
              <DateTimePicker
                testID="endDatePicker"
                value={endDate}
                mode={'date'}
                minimumDate={startDate}
                is24Hour={false}
                display="default"
                style={styles.datePicker}
                themeVariant="light"
                onChange={e => {
                  upadateEndDate(e);
                  // console.log(143, startDate), setIsDate(false);
                }}
                onTouchCancel={() => {
                  console.log(276), setIsDate2(false);
                }}
              />
            </>
          ) : endDate != null && Platform.OS == 'ios' ? (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate}
              mode={'date'}
              minimumDate={startDate}
              is24Hour={false}
              display="default"
              style={styles.datePicker}
              themeVariant="light"
              onChange={e => {
                upadateEndDate(e);
                // console.log(143, startDate), setIsDate(false);
              }}
              onTouchCancel={() => {
                console.log(276), setIsDate(false);
              }}
            />
          ) : endDate != null &&
            isDate2 == false &&
            Platform.OS == 'android' ? (
            <TouchableOpacity
              onPress={() => setIsDate2(true)}
              style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {moment(endDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: '#E0E0E0',
                height: hp('4.5'),
                width: wp('33'),
                borderRadius: 8,
              }}
            />
          )}
        </View>
        <View style={styles.activitiesMainView}>
          <Text
            style={{
              ...globalStyles.globalTextStyles,
              fontSize: hp('2.5'),
              marginLeft: wp('5'),
              marginTop: hp('4'),
              width: wp('100'),
            }}>
            Search Your Activities!
          </Text>
          {activity.length > 0 ? (
            activity.map((res, i) => {
              return (
                <TouchableOpacity
                  onPress={() => selectActivities(res, i)}
                  style={{
                    ...styles.activitiesContainer,
                    backgroundColor: activities.includes(res)
                      ? color.lightPurple
                      : 'white',
                    borderColor: activities.includes(res)
                      ? color.orderBoxColor
                      : 'black',
                    borderWidth: activities.includes(res) ? 2 : 1,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: activities.includes(res)
                        ? color.orderBoxColor
                        : 'black',
                      fontWeight: activities.includes(res) ? 'bold' : 'normal',
                    }}>
                    {res?.name}
                  </Text>
                </TouchableOpacity>
              );
            })
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
        </View>
        {/* <View style={styles.inputView}>
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
        </View> */}
        {isloading ? (
          <SkypeIndicator
            color={color.bottomBarColor}
            size={hp('6')}
            style={{marginTop: hp('3')}}
          />
        ) : (
          <TouchableOpacity
            // onPress={() => applyFilterFun()}
            onPress={() => {
              country_id != null
                ? navigation.navigate('PackageScreen', {
                    data: allstate,
                    url: SearchFilterUrl,
                  })
                : errorMessage('Please Select Country');
            }}
            style={styles.buttonView}>
            <Text style={styles.buttonText}>Apply Filter</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
