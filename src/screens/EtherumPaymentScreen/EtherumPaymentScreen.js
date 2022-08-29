import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/type';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';

const EtherumPaynemtScreen = ({route, navigation}) => {
  const {PendingPackages} = useSelector(state => state.PendingPackages);
  const dispatch = useDispatch();
  const item = route.params;
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: types.UpdateCountValue,
        payload: item,
        //   UpdateCountValue: PendingPackages[0].screenOpenCount - 1,
      });
    }, 1000);
    // if (PendingPackages.length > 0) {
    //   const y = PendingPackages.filter(packages => {
    //     packages.id == item.id;
    //     return packages[0];
    //   });
    //   console.log(18, y);
    //   if (y.length > 0) {
    //     const u = (y[0].screenOpenCount = y[0].screenOpenCount - 1);
    //     setTimeout(() => {
    //       console.log(17, u, 78, y);
    //     }, 2000);
    //   }
    // }
  }, []);
  //   setTimeout(() => {
  //     console.log(6, PendingPackages.id + ',' + PendingPackages.screenOpenCount);
  //   }, 2000);
  setTimeout(() => {
    const y = PendingPackages.filter(packages => packages.id == item.id);
    console.log(45, y[0].screenOpenCount, 67, y, 89, PendingPackages);
    // return <Text>{y[0].screenOpenCount}</Text>;
  }, 3000);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>
          {PendingPackages.map(res => {
            return res.screenOpenCount;
          })}
        </Text> */}
      {/* {setTimeout(() => {
        const y = PendingPackages.filter(packages => packages.id == item.id);
        console.log(45, y[0].screenOpenCount);
        // return <Text>{y[0].screenOpenCount}</Text>;
      }, 3000)} */}
      {/* <Text>
        {setTimeout(() => {
          return PendingPackages.map(res => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('PendingPackages', item)}>
                <Text>{res.id + ',' + res.screenOpenCount}</Text>
              </TouchableOpacity>
            );
          });
        }, 2000)}
      </Text> */}
    </View>
  );
};

export default EtherumPaynemtScreen;
