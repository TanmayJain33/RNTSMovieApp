import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import capitalizeName from '../../utilities/Capitalization';
import {Icon} from '../../atoms/Icon/Icon';
import {Divider} from '../../atoms/Divider/Divider';
import {useSelector, useDispatch} from 'react-redux';
import {
  getMovieReviews,
  getTVReviews,
} from '../../redux/actions/reviews.action';

export default function ReviewList(props: any) {
  const {movieReviews, tvReviews} = useSelector(
    (state: any) => state.reviewsReducer,
  );
  const dispatch: any = useDispatch();

  const fetchMovieReviews = async () => {
    await dispatch(getMovieReviews(props.movieId));
  };

  const fetchTVReviews = async () => {
    await dispatch(getTVReviews(props.TVId));
  };

  useEffect(() => {
    props.movieId ? fetchMovieReviews() : fetchTVReviews();
  }, []);

  const displayReviewList = ({item}: any) => {
    console.log(item.content);
    return (
      item.author && (
        <Box width={300} height={200} mr="m">
          <Text variant="headingSmall" textAlign="left" my="s">
            {capitalizeName(item.author)}
          </Text>
          <Box flexDirection="row" alignItems="center" mb="s">
            <Icon
              title="star"
              size={theme.spacing.m}
              color={theme.colors.secondary}
            />
            <Text ml="xs" variant="text_normal">
              {item.author_details.rating ? item.author_details.rating : 0}
            </Text>
          </Box>
          <Text variant="text_normal">
            {item.content.length > 250
              ? `${item.content.slice(0, 250).replace(/\s/g, ' ')}...`
              : item.content}
          </Text>
        </Box>
      )
    );
  };

  return (
    <Box>
      {movieReviews.length <= 0 && tvReviews.length <= 0 ? (
        <Loader />
      ) : (
        <>
          <Divider color="whiteColor" height={1} my="m" />
          <Box>
            <Text variant="subHeading" mb="m">
              {props.title}
            </Text>
            <FlatList
              keyExtractor={item => item.id}
              data={props.movieId ? movieReviews : tvReviews}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={displayReviewList}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
