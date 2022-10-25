import React, {useEffect} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {Loader} from '../../atoms/Loader/Loader';
import {Icon} from '../../atoms/Icon/Icon';
import {useRoute} from '@react-navigation/native';
import theme from '../../styles/theme';
import {Header} from '../../atoms/Header/Header';
import Videos from '../../molecules/Videos/Videos';
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';
import {Divider} from '../../atoms/Divider/Divider';
import PeopleList from '../../molecules/PeopleList/PeopleList';
import MoviesList from '../../molecules/MoviesList/MoviesList';
import ReviewList from '../../molecules/ReviewList/ReviewList';
import MoreAbout from '../../molecules/MoreAbout/MoreAbout';
import {useSelector, useDispatch} from 'react-redux';
import {getMovieDetails} from '../../redux/actions/movies.action';

export default function MovieDetails() {
  const route = useRoute();
  const {movieId}: any = route.params;
  const {movieDetails} = useSelector((state: any) => state.moviesReducer);
  const dispatch: any = useDispatch();

  const fetchMovieDetails = async () => {
    await dispatch(getMovieDetails(movieId));
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const getGenre = () => {
    return movieDetails.genres.map((genre: {name: string}) => (
      <Box
        borderWidth={1}
        borderRadius={5}
        borderColor="whiteColor"
        px="sm"
        mr="s"
        py="xs">
        <Text variant="genre">{genre.name}</Text>
      </Box>
    ));
  };

  return (
    <Box flex={1} bg="primary">
      <Header
        title={movieDetails.title}
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
        iconLeft={true}
        iconName="arrow-back"
        iconColor={theme.colors.secondary}
        iconSize={theme.spacing.ml}
      />
      <Box bg="primary" flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {movieDetails.length <= 0 ? (
            <Loader />
          ) : (
            <Box>
              <ImageSlider movieId={movieId} />
              {movieDetails.homepage ? (
                <Box
                  bg="secondary"
                  borderRadius={100}
                  p="sm"
                  ml="m"
                  mt="-ml"
                  alignItems="center"
                  width={45}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(movieDetails.homepage);
                    }}>
                    <Icon
                      title="md-link-sharp"
                      color={theme.colors.whiteColor}
                      size={22}
                    />
                  </TouchableOpacity>
                </Box>
              ) : null}
              <Box m="m">
                <Box flexDirection="row">
                  <Image
                    source={{
                      uri: `${IMAGE_POSTER_URL}${movieDetails.poster_path}`,
                    }}
                    style={styles.posterImage}
                  />
                  <Box flex={1} ml="m" my="s">
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal>
                      {getGenre()}
                    </ScrollView>
                    <Box flex={1} my="s">
                      <Text variant="text_normal" fontSize={13}>
                        {movieDetails.overview}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Divider color="whiteColor" height={1} my="m" />
                <Box flexDirection="row" justifyContent="space-evenly">
                  <Box alignItems="center">
                    <Icon
                      title="star"
                      size={theme.spacing.l}
                      color={theme.colors.secondary}
                    />
                    <Box mt="xxs" flexDirection="row" alignItems="center">
                      <Text variant="subHeading">
                        {movieDetails.vote_average.toFixed(1)}
                      </Text>
                      <Text variant="text_normal">/10</Text>
                    </Box>
                    <Text variant="title_sm">{movieDetails.vote_count}</Text>
                  </Box>
                  <Box alignItems="center">
                    <Icon
                      title="people"
                      size={theme.spacing.l}
                      color={theme.colors.secondary}
                    />
                    <Text mt="xxs" variant="subHeading">
                      {movieDetails.popularity.toFixed(0)}
                    </Text>
                  </Box>
                  <Box alignItems="center">
                    <Icon
                      title="timer"
                      size={theme.spacing.l}
                      color={theme.colors.secondary}
                    />
                    <Text mt="xxs" variant="subHeading">
                      {movieDetails.runtime} mins.
                    </Text>
                  </Box>
                </Box>
                <Divider color="whiteColor" height={1} my="m" />
                <PeopleList title="Cast" movieId={movieId} />
                <Divider color="whiteColor" height={1} my="m" />
                <MoviesList movieId={movieId} title="More like this" />
                <Divider color="whiteColor" height={1} my="m" />
                <Videos
                  title="Teasers | Trailers"
                  movieId={movieId}
                  imageSource={`${IMAGE_POSTER_URL}${movieDetails.backdrop_path}`}
                />
                <ReviewList title="User reviews" movieId={movieId} />
                <Divider color="whiteColor" height={1} my="m" />
                <MoreAbout
                  title={`More about "${movieDetails.title}"`}
                  movieId={movieId}
                />
              </Box>
            </Box>
          )}
        </ScrollView>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  posterImage: {width: 100, height: 170},
});
