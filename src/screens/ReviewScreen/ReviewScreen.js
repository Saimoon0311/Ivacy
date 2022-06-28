import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {color} from '../../components/color';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';

const ReviewScreen = ({navigation}) => {
  const [starCount, setstarCount] = useState(0);

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
  const ratingCompleted = rating => console.log('Rating is: ', rating);
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
          <Text style={styles.ratingtxt}>4.3</Text>
          <Text style={styles.outOfTxt}>out of 5</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp('20'),
            paddingRight: wp('2'),
            // paddingLeft: ml,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.CommentContainer}>
                <View style={styles.topCommentTxt}>
                  <Text style={styles.titleTxt}>Istakiah Remon</Text>
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
                <Text style={styles.desc}>
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart. I am alone, and feel the charm of existence in
                  this spot, which was created for the bliss of souls like mine.
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ReviewScreen;
