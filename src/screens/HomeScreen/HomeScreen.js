import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  PlatformColor,
  Platform,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {FrontPackageCom} from '../../components/FrontPackageComponent/frontPackageCom';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/type';
import {globalStyles} from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';
import SearchBarComponents from '../../components/SearchBarComponents/SearchBarComponents';

const HomeScreen = () => {
  const [topCities, setTopCities] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);

  const disptach = useDispatch();
  const {userData} = useSelector(state => state.userData);
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />

      <Text
        style={{
          ...globalStyles.globalTextStyles,
          fontSize: hp('3'),
          marginLeft: wp('5'),
        }}>
        Enjoy your life with us!
      </Text>
      
      <View>
        <SearchBarComponents />
      </View>
      <Text
        style={{
          ...globalStyles.globalTextStyles,
          fontSize: hp('2.8'),
          marginLeft: wp('5'),
        }}>
        Top Destinations
      </Text>
      
      <FrontPackageCom />
      
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...globalStyles.globalTextStyles,
              fontSize: hp('2.8'),
              marginLeft: wp('5'),
            }}>
            Top Cities
          </Text>

          <TouchableOpacity style={styles.hotTextTouc}>
            <Text
              style={{
                color: color.white,
                fontWeight: 'bold',
                fontSize: hp('1.7'),
              }}>
              Hot
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={topCities}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          horizontal
          contentContainerStyle={{marginLeft: wp('3'), paddingBottom: hp('3')}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                // onPress={() => navigation.navigate('SubCategory', item)}
                style={{
                  marginLeft: wp('3'),
                  marginRight: wp('1.5'),
                  marginTop: hp('1.5'),
                }}>
                <ImageBackground
                  borderRadius={10}
                  resizeMode="stretch"
                  style={styles.imageStyle}
                  // source={{uri: IMAGE_BASED_URL + item?.image?.url}}
                  source={{
                    uri: 'https://cdn.britannica.com/62/153462-050-3D4F41AF/Grand-Canal-Venice.jpg',
                  }}>
                  <Text style={styles.textImageBackground}>hello</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...globalStyles.globalTextStyles,
              fontSize: hp('2.8'),
              marginLeft: wp('5'),
            }}>
            World top Hotels
          </Text>
          <TouchableOpacity style={styles.hotTextTouc}>
            <Text
              style={{
                color: color.white,
                fontWeight: 'bold',
                fontSize: hp('1.7'),
              }}>
              Hot
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={topCities}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          horizontal
          contentContainerStyle={{marginLeft: wp('3'), paddingBottom: hp('3')}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                // onPress={() => navigation.navigate('SubCategory', item)}
                style={{
                  marginLeft: wp('3'),
                  marginRight: wp('1.5'),
                  marginTop: hp('1.5'),
                }}>
                <ImageBackground
                  borderRadius={10}
                  resizeMode="stretch"
                  style={styles.imageStyle}
                  // source={{uri: IMAGE_BASED_URL + item?.image?.url}}
                  source={{
                    uri: 'https://cdn.britannica.com/62/153462-050-3D4F41AF/Grand-Canal-Venice.jpg',
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <TouchableOpacity onPress={() => disptach({type: types.LogoutType})}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;
