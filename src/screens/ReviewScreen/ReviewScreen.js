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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
const ReviewScreen = ({navigation}) => {
  const isFocused = useIsFocused();
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

  const reviewsFunc = () => {
    ApiGet(ReviewUrl, userData.access_token).then(res => {
      console.log(res.json, 44);
      if (res.status == 200) {
        setReviewState(res.json);
        setIsloading(false);
      } else if (res.status == 404) {
        errorMessage(res.json.message);
        setIsloading(true);
      } else {
        errorMessage('Network Request Failed.');
        setIsloading(true);
      }
    });
  };
  const ratingCompleted = rating => console.log('Rating is: ', rating);
  useEffect(() => {
    reviewsFunc();
    if (isFocused) {
      reviewsFunc();
    }
  }, [isFocused]);

  const loadingView = () => {
    return (
      <View
        style={{
          ...styles.CommentContainer,
          backgroundColor: 'transparent',
          borderWidth: 1,
        }}>
        <View
          style={{
            ...styles.titleTxt,
            backgroundColor: 'red',
            height: hp('3'),
            borderRadius: 5,
            marginTop: hp('1'),
            marginLeft: wp('2'),
          }}
        />
        <View
          style={{
            ...styles.titleTxt,
            backgroundColor: 'red',
            height: hp('3'),
            borderRadius: 5,
            marginLeft: wp('2'),
            marginTop: hp('1'),
            width: wp('30'),
          }}
        />
        <View
          style={{
            ...styles.desc,
            height: hp('20'),
            marginTop: hp('1'),
            borderRadius: 10,
            marginBottom: hp('1'),
          }}
        />
      </View>
    );
  };
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
        {isloading ? (
          <SkypeIndicator
            color={color.boxColor}
            size={hp('4')}
            style={{
              alignSelf: 'center',
              marginTop: hp('6'),
            }}
          />
        ) : (
          <View style={styles.ratingtxtContainer}>
            <Text style={styles.ratingtxt}>{reviewState.review_avg}</Text>
            <Text style={styles.outOfTxt}>out of 5</Text>
          </View>
        )}
      </View>
      <View>
        {isloading ? (
          <SkeletonPlaceholder>
            {loadingView()}
            {loadingView()}
            {loadingView()}
            {loadingView()}
            {loadingView()}
            {loadingView()}
            {loadingView()}
            {loadingView()}
          </SkeletonPlaceholder>
        ) : (
          <FlatList
            data={reviewState.data}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: hp('40'),
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.CommentContainer}>
                  <View style={styles.topCommentTxt}>
                    <Text style={styles.titleTxt}>
                      {item.get_review_user.username}
                    </Text>
                    <Text>{moment(item.created_at, 'YYYYMMDD').fromNow()}</Text>
                  </View>
                  <View style={{marginLeft: wp('3')}}>
                    <StarRating
                      containerStyle={{width: wp('10')}}
                      starSize={20}
                      fullStarColor={color.textSecondaryColor}
                      starStyle={{
                        marginBottom: hp('1'),
                        marginTop: hp('1'),
                      }}
                      disabled={true}
                      maxStars={5}
                      rating={item.star}
                    />
                  </View>
                  <Text style={styles.desc}>{item.message}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ReviewScreen;
