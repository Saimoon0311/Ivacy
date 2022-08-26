import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/type';

const PendingPackageScreen = ({route, navigation}) => {
  const {PendingPackages} = useSelector(state => state.PendingPackages);
  const dispatch = useDispatch();
  const item = route.params;
  //   useEffect(() => {
  //     dispatch({
  //       type: types.UpdateCountValue,
  //       payload: item,
  //       UpdateCountValue: PendingPackages[0].screenOpenCount - 1,
  //     });
  //     // if (PendingPackages.length > 0) {
  //     //   const y = PendingPackages.filter(packages => {
  //     //     packages.id == item.id;
  //     //     return packages[0];
  //     //   });
  //     //   console.log(18, y);
  //     //   if (y.length > 0) {
  //     //     const u = (y[0].screenOpenCount = y[0].screenOpenCount - 1);
  //     //     setTimeout(() => {
  //     //       console.log(17, u, 78, y);
  //     //     }, 2000);
  //     //   }
  //     // }
  //   }, []);
  console.log(90, PendingPackages);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>
        {PendingPackages.map(res => {
          return res.screenOpenCount;
        })}
      </Text> */}
      {/* <Text> */}
      {PendingPackages.map(res => {
        return (
          <TouchableOpacity
            style={{backgroundColor: 'yellow'}}
            onPress={() => navigation.navigate('EtherumPaynemtScreen', item)}>
            <Text>{res.id + ',' + res.screenOpenCount}</Text>
          </TouchableOpacity>
        );
      })}
      {/* </Text> */}
    </View>
  );
};

export default PendingPackageScreen;
