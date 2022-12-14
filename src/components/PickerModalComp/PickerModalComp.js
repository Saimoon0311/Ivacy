import React from 'react';
import {
  View,
  Text,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {color} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import {useEffect} from 'react';

export const PickerModalComp = props => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const searchFilterFunction = text => {
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = props.data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(props.data);
    }
  };
  const updateState = data => {
    setFilteredDataSource(data);
  };
  useEffect(async () => {
    await updateState(props.data);
    console.log(41, filteredDataSource);
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props?.isVisible}
      onRequestClose={() => {
        props.forHideModal();
      }}>
      <View
        style={{
          position: 'absolute',
          height: hp('100'),
          width: wp('100'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(42,42,42,0.6)',
          zIndex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: hp('85'),
            width: wp('90'),
            borderRadius: 20,
          }}>
          <TextInput
            style={{
              width: wp('80'),
              height: hp('5'),
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
              alignSelf: 'center',
              marginTop: hp('3'),
              paddingLeft: wp('2'),
            }}
            onChangeText={e => searchFilterFunction(e)}
            placeholder="Search"
            placeholderTextColor={'gray'}
          />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp('10'),
              justifyContent: 'space-between',
            }}
            style={{
              width: wp('80'),
              alignSelf: 'center',
              marginTop: hp('2'),
              marginBottom: hp('2'),
            }}>
            {console.log(89, filteredDataSource)}
            {filteredDataSource.length > 0
              ? filteredDataSource.map((res, i) => {
                  return (
                    <TouchableOpacity
                      style={{marginTop: hp('2')}}
                      onPress={() => {
                        props.selectValues(res, i),
                          setFilteredDataSource(props.data);
                      }}>
                      <Text style={{color: 'black', fontSize: hp('2')}}>
                        {res.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : props.data.map((res, i) => {
                  return (
                    <TouchableOpacity
                      style={{marginTop: hp('2')}}
                      onPress={() => {
                        props.selectValues(res, i),
                          setFilteredDataSource(props.data);
                      }}>
                      <Text style={{color: 'black', fontSize: hp('2')}}>
                        {res.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
