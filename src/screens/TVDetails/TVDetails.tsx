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
import {getTVDetails} from '../../redux/actions/tv.action';

export default function TVDetails() {
  const route = useRoute();
  const {TVId}: any = route.params;
  const {tvDetails} = useSelector((state: any) => state.tvReducer);
  const dispatch: any = useDispatch();

  const fetchMovieDetails = async () => {
    await dispatch(getTVDetails(TVId));
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const getGenre = () => {
    return tvDetails.genres.map((genre: {name: string}) => (
      <Box
        borderWidth={1}
        borderRadius={5}
        borderColor="whiteColor"
        height={32}
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
        title={tvDetails.name}
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
        iconLeft={true}
        iconName="arrow-back"
        iconColor={theme.colors.secondary}
        iconSize={theme.spacing.ml}
      />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        {tvDetails.length <= 0 ? (
          <Loader />
        ) : (
          <Box>
            <ImageSlider TVId={TVId} />
            {tvDetails.homepage ? (
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
                    Linking.openURL(tvDetails.homepage);
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
                  source={{uri: `${IMAGE_POSTER_URL}${tvDetails.poster_path}`}}
                  style={styles.posterImage}
                />
                <Box flex={1} ml="m" my="s">
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {getGenre()}
                  </ScrollView>
                  <Box flex={1} my="s">
                    <Text variant="text_normal" fontSize={13}>
                      {tvDetails.overview}
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
                      {tvDetails.vote_average.toFixed(1)}
                    </Text>
                    <Text variant="text_normal">/10</Text>
                  </Box>
                  <Text variant="title_sm">{tvDetails.vote_count}</Text>
                </Box>
                <Box alignItems="center">
                  <Icon
                    title="people"
                    size={theme.spacing.l}
                    color={theme.colors.secondary}
                  />
                  <Text mt="xxs" variant="subHeading">
                    {tvDetails.popularity.toFixed(0)}
                  </Text>
                </Box>
                <Box alignItems="center">
                  <Icon
                    title="timer"
                    size={theme.spacing.l}
                    color={theme.colors.secondary}
                  />
                  <Text mt="xxs" variant="subHeading">
                    {tvDetails.episode_run_time} mins/episode
                  </Text>
                </Box>
              </Box>
              <Divider color="whiteColor" height={1} my="m" />
              <PeopleList title="Cast" TVId={TVId} />
              <Divider color="whiteColor" height={1} my="m" />
              <MoviesList title="More like this" TVId={TVId} tv={true} />
              <Divider color="whiteColor" height={1} my="m" />
              <Videos
                title="Teasers | Trailers"
                TVId={TVId}
                imageSource={`${IMAGE_POSTER_URL}${tvDetails.backdrop_path}`}
              />
              <Divider color="whiteColor" height={1} my="m" />
              <ReviewList title="User reviews" TVId={TVId} />
              <Divider color="whiteColor" height={1} my="m" />
              <MoreAbout
                title={`More about "${tvDetails.name}"`}
                TVId={TVId}
                url={`/tv/${TVId}/external_ids`}
              />
            </Box>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  posterImage: {width: 100, height: 170},
});
