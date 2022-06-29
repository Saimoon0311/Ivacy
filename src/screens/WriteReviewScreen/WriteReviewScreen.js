import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../WriteReviewScreen/styles';
import StarRating from 'react-native-star-rating';
import {color} from '../../components/color';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';

const WriteReviewScreen = ({navigation}) => {
  const [starCount, setstarCount] = useState(0);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  console.log(title);
  const onStarRatingPress = rating => {
    setstarCount(rating);
  };
  const navigate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackHeaderCom text={'Write a Review'} goBack={navigate} />
      <View style={styles.mainContainer}>
        <View style={styles.writTxtContainer}>
          <Text style={styles.writTxt}>Write a Review</Text>
        </View>

        <View>
          <StarRating
            containerStyle={{alignSelf: 'center', paddingTop: hp('3')}}
            starSize={30}
            fullStarColor={color.textSecondaryColor}
            starStyle={{
              marginBottom: hp('0.5'),
              marginTop: hp('0.5'),
              marginLeft: wp('0.5'),
            }}
            maxStars={5}
            rating={starCount}
            selectedStar={rating => onStarRatingPress(rating)}
          />
          <Text style={{textAlign: 'center'}}>Tap a star to rate</Text>
        </View>
        <View>
          <TextInput
            style={styles.txtInputContainer}
            onChangeText={e => setTitle(e)}
            value={title}
            placeholder="Title"
            asd
            keyboardType="default"
            maxLength={25}
          />
        </View>
        <View>
          <TextInput
            style={styles.destxtInputContainer}
            onChangeText={e => setDes(e)}
            value={des}
            placeholder="Reviews"
            keyboardType="default"
            multiline={true}
            textAlignVertical="top"
            maxLength={250}
          />
        </View>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WriteReviewScreen;
