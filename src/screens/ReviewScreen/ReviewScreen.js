import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {color} from '../../components/color';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import {ApiGet} from '../../config/helperFunction';
import {ReviewUrl} from '../../config/Urls';
import {errorMessage} from '../../components/NotificationMessage';
const ReviewScreen = ({navigation}) => {
  const [starCount, setstarCount] = useState(0);
  const {userData} = useSelector(state => state.userData);
  const [isloading, setIsloading] = useState(true);
  const [reviewState, setReviewState] = useState([]);

  const onStarRatingPress = rating => {
    setstarCount(rating);
  };
  const navigate = () => {
    navigation.goBack();
  };
  const [data, setData] = useState([
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
  ]);
  const reviewsFunc = () => {
    ApiGet(ReviewUrl, userData.access_token).then(res => {
      console.log(res, 44);
      if (res.status == 200) {
        setReviewState(res.json);
        setIsloading(false);
      } else if (res.status == 404) {
        errorMessage(res.json.message);
        setIsloading(false);
      } else {
        errorMessage('Network Request Failed.');
        setIsloading(false);
      }
    });
  };
  const ratingCompleted = rating => console.log('Rating is: ', rating);
  useEffect(() => {
    reviewsFunc();
  }, []);

  return (
    <View style={styles.container}>
      <BackHeaderCom text={'Reviews'} goBack={navigate} />
      <View style={styles.mainContainer}>
        <View style={styles.topTxtContainer}>
          <Text style={styles.RevieTxt}>Reviews</Text>
          <View style={styles.writeRevContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WriteReviewScreen')}>
              <Text style={styles.writRevTxt}>Write a Review</Text>
            </TouchableOpacity>
            <Ionicons
              name="chevron-forward-sharp"
              color={color.textSecondaryColor}
              size={20}
            />
          </View>
        </View>
        <View style={styles.ratingtxtContainer}>
          <Text style={styles.ratingtxt}>{reviewState.review_avg}</Text>
          <Text style={styles.outOfTxt}>out of 5</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={reviewState.data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp('7'),
            paddingRight: wp('2'),
            // paddingLeft: ml,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.CommentContainer}>
                <View style={styles.topCommentTxt}>
                  <Text style={styles.titleTxt}>
                    {item.get_review_user.username}
                  </Text>
                  <Text>June 2016</Text>
                </View>
                <View style={{marginLeft: wp('2')}}>
                  <StarRating
                    containerStyle={{width: wp('10')}}
                    starSize={20}
                    fullStarColor={color.textSecondaryColor}
                    starStyle={{
                      marginBottom: hp('0.5'),
                      marginTop: hp('0.5'),
                    }}
                    maxStars={4}
                    rating={starCount}
                    selectedStar={rating => onStarRatingPress(rating)}
                  />
                </View>
                <Text style={styles.desc}>{item.message}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ReviewScreen;
